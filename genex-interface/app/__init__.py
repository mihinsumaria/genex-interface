import logging

from flask import Flask

app = Flask(__name__)

log_format = '%(asctime)s [%(levelname)s] %(name)s: %(message)s'
formatter = logging.Formatter(log_format)

streamHandler = logging.StreamHandler()
streamHandler.setLevel(logging.DEBUG)
streamHandler.setFormatter(formatter)

logger = app.logger
logger.setLevel(logging.DEBUG)
logger.addHandler(streamHandler)

from app import routes
