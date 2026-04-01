import logging

logging.basicConfig(filename="app.log",
                    format='%(asctime)s %(levelname)s: %(message)s',
                    filemode='w')

logger = logging.getLogger()
logger.setLevel(logging.INFO)