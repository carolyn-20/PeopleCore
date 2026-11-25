from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from decimal import Decimal, ROUND_HALF_UP
from typing import List, Optional
app=FastAPI(title="PeopleCore Payroll & Workforce Analytics",version="1.0.0")
def money(v): return Decimal(str(v)).quantize(Decimal("0.01"),rounding=ROUND_HALF_UP)
class Component(BaseModel): name:str; amount:Decimal; kind:str=Field(pattern="^(earning|deduction)$")
class PayrollInput(BaseModel): employee_code:str; base_salary:Decimal=Field(ge=0); days_in_period:int=Field(gt=0,le=31); days_worked:int=Field(ge=0,le=31); components:List[Component]=[]; overtime_hours:Decimal=Field(default=Decimal(0),ge=0); overtime_multiplier:Decimal=Field(default=Decimal("1.5"),ge=0); unpaid_leave_days:Decimal=Field(default=Decimal(0),ge=0); tax_rate:Decimal=Field(default=Decimal(0),ge=0,le=1)
@app.get('/health')
def health():return {'status':'ok','service':'peoplecore-payroll'}
@app.post('/payroll/calculate')
def calculate(p:PayrollInput):
 if p.days_worked>p.days_in_period:raise HTTPException(422,'days_worked exceeds period length')
 daily=p.base_salary/Decimal(p.days_in_period); unpaid=money(daily*p.unpaid_leave_days); overtime=money((p.base_salary/Decimal(160))*p.overtime_hours*p.overtime_multiplier)
 earnings=sum((c.amount for c in p.components if c.kind=='earning'),Decimal(0)); deductions=sum((c.amount for c in p.components if c.kind=='deduction'),Decimal(0));gross=money(p.base_salary-unpaid+overtime+earnings);tax=money(gross*p.tax_rate);total=money(deductions+tax);net=money(gross-total)
 if net<0:raise HTTPException(422,'Deductions exceed gross pay')
 return {'employee_code':p.employee_code,'gross':str(gross),'deductions':str(total),'net':str(net),'breakdown':{'base_salary':str(money(p.base_salary)),'unpaid_leave':str(unpaid),'overtime':str(overtime),'other_earnings':str(money(earnings)),'other_deductions':str(money(deductions)),'tax':str(tax)}}
class Workforce(BaseModel): employees:List[dict]=[]; attendance:List[dict]=[]; leave:List[dict]=[]
@app.post('/analytics/summary')
def analytics(d:Workforce):
 active=[e for e in d.employees if e.get('status','active')=='active']; total=len(d.employees); clocked=len([a for a in d.attendance if a.get('event_type')=='clock_in']); approved=sum(float(l.get('days',0)) for l in d.leave if l.get('status')=='approved')
 return {'headcount':total,'active_headcount':len(active),'attendance_clockins':clocked,'approved_leave_days':round(approved,2),'attrition_percent':round((total-len(active))/total*100,2) if total else 0}
