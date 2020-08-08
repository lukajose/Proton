import re
from ErrorHandlers import ValueErrorHttp

def validate_email(email):
    print('yes enters validation')
    print('email:',email)
    regex = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
    if(re.search(regex,email)):
        return True
    else: 
        raise ValueErrorHttp(description="Invalid email address")

def validate_names(name_first,name_last):
    if(len(name_first) < 2  or len(name_last) < 2):
        raise ValueErrorHttp(description="first and last name should be greater than 2")
    #only letters should be allowed in names
    if(not name_first.isalpha() or not name_last.isalpha()):
        raise ValueErrorHttp(description="only alpha letters allowed, no spaces!")


def validate_password(password):
    if len(password) < 5 or len(password) > 15:
        raise ValueErrorHttp(description='password must be at least length 5+ and less than 15')
    else:
        #check it contains upper case, a number and a sign
        rules = {"upper":False,"lower":False,"number":False}
        for letter in password:
            if letter.islower():
                rules['lower'] = True
            if letter.isupper():
                rules['upper'] = True
            if letter.isdigit():
                rules['number'] = True
        if(all([rules['upper'],rules['lower'],rules['number']])):
            return True
        else:
            raise ValueErrorHttp(description="password must contain at least one upper, lower  letter and number")



""" given register input validate data """
def validate_register(name_first,name_last,email,password):
    validate_email(email)
    validate_names(name_first,name_last)
    validate_password(password)
    return True
