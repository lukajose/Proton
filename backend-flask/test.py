import psycopg2 as pg
from database import DBElephant

db = DBElephant()
db.query("""SELECT * from users""")
data = db.fetchall()
print(data)
