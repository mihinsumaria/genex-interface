import unittest
from ..routes import load_and_group_dataset
from ..picture import get_line_thumbnail_base64

class TestRoutes(unittest.TestCase):

    def test_get_base64_encoding(self):
        data = [1, 2, 3, 4, 5, 6, 7]
        b64 = get_line_thumbnail_base64(data)
        self.assertTrue(len(b64) > 0)

    def test_load_and_group_dataset(self):
        expect = {
            'count': 10,
            'length': 20,
            'subseq': 1900,
            'groupCount': 1744,
            'groupDensity': ''
        }
        actual = load_and_group_dataset('test', 0.1, 'euclidean')
        for k in expect:
            if not k == 'groupDensity':
                self.assertEqual(actual[k], expect[k])

        again = load_and_group_dataset('test', 0.1, 'euclidean')
        for k in expect:
            if not k == 'groupDensity':
                self.assertEqual(again[k], expect[k])
