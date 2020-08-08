from werkzeug.exceptions import HTTPException


class LoginErrorHttp(HTTPException):
    """ Error class for invalid values """
    code = 401
    description = "Invalid user or password"

class RegisterErrorHttp(HTTPException):
    code = 401
    description = "Email registered, forgot password?"


class ValueErrorHttp(HTTPException):
    code = 400
    description = "invalid input data try again"