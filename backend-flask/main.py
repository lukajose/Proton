import flask as f
from json import dumps
from database import DBElephant
from flask_cors import CORS
from flask import request
import re
from ErrorHandlers import LoginErrorHttp, RegisterErrorHttp, ValueErrorHttp
from validate import validate_register
# will be used for authentification
from werkzeug.middleware.proxy_fix import ProxyFix


app = f.Flask(__name__)
#app.wsgi_app = ProxyFix(app.wsgi_app)

def defaultHandler(err):
    response = err.get_response()
    response.data = dumps({
        "code": err.code,
        "name": "System error",
        "message": re.sub('<[^<]+?>', '', err.get_description() ) , #removing html tags if any from message
    })
    response.content_type = 'application/json'
    return response
app.config['TRAP_HTTP_EXCEPTIONS'] = True
app.register_error_handler(LoginErrorHttp,defaultHandler)
app.register_error_handler(RegisterErrorHttp,defaultHandler)
app.register_error_handler(ValueErrorHttp,defaultHandler)
CORS(app)


@app.route('/test')
def hello_world():
    db = DBElephant(cur_type ='dic')
    db.query('SELECT * from users;')
    data = db.fetchall()
    return dumps({"data":data},indent=4, sort_keys=True, default=str)



@app.route('/auth/login', methods=['POST'])
def post_login():
    email = request.form.get('email')
    password = request.form.get('password')
    db = DBElephant()
    user_data = db.login_user(email,password)
    db.close_commit()
    print('user data:',user_data)
    if (user_data):
        u_id, token = user_data
        return dumps({'u_id':u_id,'token': token})
    else:
        raise LoginErrorHttp(description= "Invalid user or password")
    


@app.route('/auth/register', methods=['POST'])
def post_register():
    # Get all the data sent by client
    email = request.form.get('email')
    password = request.form.get('password')
    name_first = request.form.get('name_first')
    name_last = request.form.get('name_last')
    print(f"{email}, {password}, {name_first}, {name_last}")
    #validate data
    validate_register(name_first,name_last,email,password)

    #open database connection
    db = DBElephant()

    #check user exists if exists raise error
    if(db.user_in_db(email)):
        raise RegisterErrorHttp

    else:
        u_id, token = db.register_user(name_first,name_last,email,password)
        db.close_commit()
        return dumps({'u_id':u_id,'token': token})

#needs to add some auth here
@app.route('/tasks/completed', methods=['POST','GET'])
def post_tasks_completed():
    
    if request.method == 'GET':
        u_id = request.args.get('u_id')
        if(u_id):
            db = DBElephant(cur_type ='dic')
            db.query("""select * from tasks where user_id={};""".format(u_id))
            tasks = db.fetchall()
            return dumps({"tasks":tasks},indent=4, sort_keys=True, default=str)
        else:
            raise ValueErrorHttp

    
    
    
    if request.method == 'POST':
        #get the body
        u_id = request.form.get('u_id')
        task = request.form.get('task')
        hours_taken = request.form.get('hours_taken')
        print(u_id,task,)
        if(u_id and task and hours_taken):
            #open connection and insert
            u_id = int(u_id)
            hours_taken = round(float(hours_taken),5)
            db = DBElephant()
            t_id = db.get_table_count('tasks') + 1
            print('t_id:',t_id)
            query_insert = """insert into tasks values ({},{},'{}',{},current_timestamp);""".format(t_id,u_id,task,hours_taken)
            outcome = db.query(query_insert)
            db.close_commit()
            return dumps({'t_id':t_id,'status':outcome})
        else:
            raise ValueErrorHttp



#aggregate the hours per day
@app.route('/tasks/completed/byday', methods=['GET'])
def get_tasks_completed():
        u_id = request.args.get('u_id')
        if(u_id):
            db = DBElephant(cur_type ='dic')
            db.query("""select date_completed as date,sum(hours_taken) as total_hours \
                from tasks where user_id ={} group by date_completed;""".format(u_id))
            tasks = db.fetchall()
            return dumps({"tasks":tasks},indent=4, sort_keys=True, default=str)
        else:
            raise ValueErrorHttp

"""


    return dumps(login.auth_login(username, password))

@app.route('/auth/logout', methods=['POST'])
def post_logout():
    token = f.request.form.get('token')
    return dumps(login.auth_logout(token))

@app.route('/auth/register', methods=['POST'])
def post_register():
    email = f.request.form.get('email')
    password = f.request.form.get('password')
    name_first = f.request.form.get('name_first')
    name_last = f.request.form.get('name_last')
    return dumps(login.auth_register(email, password, name_first, name_last))

@app.route('/auth/passwordreset/f.request', methods=['POST'])
def post_auth_passwordreset_f.request():
    mail = Mail(app)
    email = f.request.form.get('email')
    #returns a valid message object if user has not send one already
    #and if its a valid email in the slackr app
    msg = login.auth_passwordreset_f.request(email)
    if msg:
        try:
            mail.send(msg)
            return dumps({})
        except Exception as e:
            return sendError(e)

@app.route('/auth/passwordreset/reset', methods=['POST'])
def post_auth_passwordreset_reset():
    reset_code = f.request.form.get('reset_code') 
    new_password = f.request.form.get('new_password')
    return dumps(login.auth_passwordreset_reset(reset_code, new_password))
"""
if __name__ == "__main__":
    app.run(debug=True)    
