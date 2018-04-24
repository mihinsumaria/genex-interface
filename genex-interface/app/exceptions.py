from flask import jsonify


class ServerException(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv


class ArgumentRequired(ServerException):

    def __init__(self, arg_name, status_code=None, payload=None):
        message = 'Argument {} is required'.format(arg_name)
        ServerException.__init__(self, message, status_code, payload)


class FileError(ServerException):

    def __init__(self, msg, status_code=None, payload=None):
        message = 'File error: {}'.format(msg)
        ServerException.__init__(self, message, status_code, payload)
