import psycopg2 as pg
import psycopg2.extras as ex
import datetime as dt
import hashlib
import time
import jwt
import os
from decouple import config

# Defining our env variables
DATABASE_URL = config('DATABASE_URL')
SECRET = config('SECRET')
USERNAME_PSQL = config('USERNAME_PSQL')
DB_NAME = config('DB_NAME')
DB_PASSWORD= config('DB_PASSWORD')
#print(USERNAME_PSQL,DB_NAME,DB_PASSWORD)
class DBElephant():
    def __init__(self,db = DATABASE_URL,cur_type = 'auto'):
        self.conn = pg.connect(host=db,user=USERNAME_PSQL,dbname=DB_NAME,password=DB_PASSWORD)
        if(cur_type == 'dic'):
            self.cur = self.conn.cursor(cursor_factory=ex.RealDictCursor)
        else:
            self.cur = self.conn.cursor()
        print("New connection open psql")
    def query(self, query):
        try:
            self.cur.execute(query)
            return 'success'
        except pg.Error as e:
            print('An error occurrend in db, e:',e)
            return 'failed'

    def fetch_one(self):
        return self.cur.fetchone()
    
    def fetchall(self):
        return self.cur.fetchall()
    
    """Given an open connection returns the number of users in db"""
    def get_user_count(self):
        self.query("select count(*) from users;")
        return self.fetch_one()[0]

    def get_table_count(self,table):
        self.query('select count(*) from ' + table)
        return self.fetch_one()[0]

    """ Given an open connection returns true if user in db"""
    def user_in_db(self,email):
        self.query("""select u_id from users where email like '{}';""".format(email))
        u_id = self.fetch_one()
        print('uid:',u_id)
        if(u_id):
            return True
        else:
            return False
    
    
    """ hashing a given string for storing in db"""
    def _hash_password(self,password):
        return hashlib.sha256(password.encode()).hexdigest()
    """create a token to return"""
    def _generateToken(self,email):
        global SECRET
        payload = {
            'payload':email,
            'timestamp':time.time()
        }
        encoded_jwt = jwt.encode(payload, SECRET, algorithm='HS256')
        #Convert from bytes to a string
        return encoded_jwt.decode('utf-8')
    """Given some input inserts new user into db, returns u_id and token """
    
    def register_user(self,name_first,name_last,email,password):

        #get new token for user
        jwt_token = self._generateToken(email)
        #get hash password
        password = self._hash_password(password)
        
        #get permission
        permission_type = 1 #will change for further implementation in the future
        #get user id
        u_id = self.get_user_count() + 1
        self.query("""insert into Users values ({},'{}','{}','{}','{}',{},current_timestamp);"""
            .format(u_id,name_first,name_last,email,password,permission_type))

        self.query("""insert into userssessions values ({},'{}',current_timestamp);"""
            .format(u_id,jwt_token))
        return (u_id,jwt_token)
    
    """Assumming an open connection queries email and password to db"""
    def login_user(self,email,password):
        

        self.query("""select u_id,hash_password from users where email like '{}';""".format(email))
        #returns a tuple with relevant data
        data = self.fetch_one()
        print('login data:',data)
        #check if user exists in db
        if(data):
            u_id,hash_password_db = data
            if(self._hash_password(password) == hash_password_db):
                #generate a valid token
                jwt_token = self._generateToken(email)
                self.query("""insert into userssessions values ({},'{}',current_timestamp);"""
                    .format(u_id,jwt_token))
                return (u_id,jwt_token)
            else:
                #password does not match
                return False
        else:
            #user does not exist
            return False
            

    def close(self):
            self.cur.close()
            self.conn.close()
    def close_commit(self):
            self.cur.close()
            self.conn.commit()
            self.conn.close()