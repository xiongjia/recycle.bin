package leetcode

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_p0005(t *testing.T) {
	cases := []struct {
		s string
		e []string
	}{
		{
			s: "babad", e: []string{"bab", "aba"},
		},
	}
	for _, c := range cases {
		output := longestPalindromeSlution1(c.s)
		t.Logf("s = %v, e = %v; o = %v\n", c.s, c.e, output)
		assert.Contains(t, c.e, output)
	}
}
