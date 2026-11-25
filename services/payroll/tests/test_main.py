from fastapi.testclient import TestClient
from app.main import app
client=TestClient(app)
def test_health():assert client.get('/health').json()['status']=='ok'
def test_payroll_rounding_and_net():
 r=client.post('/payroll/calculate',json={'employee_code':'T-1','base_salary':'1000.00','days_in_period':30,'days_worked':30,'components':[{'name':'bonus','amount':'100','kind':'earning'},{'name':'loan','amount':'50','kind':'deduction'}],'tax_rate':'0.1'});assert r.status_code==200;assert r.json()['gross']=='1100.00';assert r.json()['net']=='940.00'
def test_negative_base_rejected():assert client.post('/payroll/calculate',json={'employee_code':'T','base_salary':-1,'days_in_period':30,'days_worked':30}).status_code==422
def test_analytics_empty():assert client.post('/analytics/summary',json={}).json()['headcount']==0
