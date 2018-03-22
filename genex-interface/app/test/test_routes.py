
import unittest
from ..routes import load_and_group_dataset

class TestRoutes(unittest.TestCase):

    def test_load_and_group_dataset(self):
        expect = {
            'distance': 'euclidean',
            'count': 10,
            'length': 20,
            'subsequences': 1900,
            'groups': 1886,
        }
        actual = load_and_group_dataset('test', 0.1, 'euclidean')
        self.assertEqual(actual, expect)

        again = load_and_group_dataset('test', 0.1, 'euclidean')
        self.assertEqual(again, expect)
