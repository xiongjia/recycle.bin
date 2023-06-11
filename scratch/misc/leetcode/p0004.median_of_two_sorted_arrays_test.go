package leetcode

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_p0004(t *testing.T) {
	cases := []struct {
		n1 []int
		n2 []int
		e  float64
	}{
		{
			n1: []int{4, 5, 6, 8, 9}, n2: []int{}, e: 6.0,
		}, {
			n1: []int{1, 3}, n2: []int{2}, e: 2.0,
		}, {
			n1: []int{1, 2}, n2: []int{3, 4}, e: 2.5,
		}, {
			n1: []int{1, 2, 3}, n2: []int{1, 2}, e: 2.0,
		},
	}
	for _, c := range cases {
		output := FindMedianSortedArraysSolution1(c.n1, c.n2)
		t.Logf("n1 = %v, n2 = %v, e = %v; o = %v\n", c.n1, c.n2, c.e, output)
		assert.Equal(t, output, c.e)
	}
}
