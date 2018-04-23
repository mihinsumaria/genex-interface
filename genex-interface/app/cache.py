import logging

import pygenex as pg
from werkzeug.contrib.cache import SimpleCache
from .utils import make_name


logger = logging.getLogger(__name__)


class GenexCache(SimpleCache):
    '''Extended SimpleCache that can unload Genex datasets'''
    def _prune(self):
        old_cache = self._cache.copy()
        super(GenexCache, self)._prune()
        for k in old_cache:
            if isinstance(k, tuple) and k not in self._cache:
                try:
                    pg.unloadDataset(make_name(*k))
                    logger.debug('Unloaded %s', k)
                except RuntimeError:
                    logger.debug('%s is not a loaded dataset', k)
