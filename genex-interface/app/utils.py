from .exceptions import ArgumentRequired


def check_exists(arg, arg_name=''):
    if arg is None:
        raise ArgumentRequired(arg_name)
    return arg


def make_name(ID, st, distance):
    return str(ID) + str(st) + str(distance)


def attach_index(data):
    return [(i, v) for i, v in enumerate(data)]
