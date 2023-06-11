package leetcode

func FindMedianSortedArraysSolution1(nums1 []int, nums2 []int) float64 {
	n1Len, n2Len := len(nums1), len(nums2)
	if n1Len > n2Len {
		nums1, nums2 = nums2, nums1
		n1Len, n2Len = n2Len, n1Len
	}

	// totalLeft
	//  1. n1Mid + n2Mid
	//  2. (len(nums1) + len(nums2)) / 2
	totalLeft := (n1Len + n2Len + 1) >> 1
	n1Mid, n2Mid := 0, 0
	n1Low, n1High := 0, n1Len
	for n1Low <= n1High {
		n1Mid = n1Low + (n1High-n1Low)>>1
		n2Mid = totalLeft - n1Mid
		if n1Mid > 0 && nums1[n1Mid-1] > nums2[n2Mid] {
			n1High = n1Mid - 1
		} else if n1Mid != n1Len && nums1[n1Mid] < nums2[n2Mid-1] {
			n1Low = n1Mid + 1
		} else {
			break
		}
	}

	totalMidLeft, totalMidRight := 0, 0
	if n1Mid == 0 {
		totalMidLeft = nums2[n2Mid-1]
	} else if n2Mid == 0 {
		totalMidLeft = nums1[n1Mid-1]
	} else {
		if nums1[n1Mid-1] > nums2[n2Mid-1] {
			totalMidLeft = nums1[n1Mid-1]
		} else {
			totalMidLeft = nums2[n2Mid-1]
		}
	}

	if (n1Len+n2Len)&1 == 1 {
		return float64(totalMidLeft)
	}

	if n1Mid == n1Len {
		totalMidRight = nums2[n2Mid]
	} else if n2Mid == n2Len {
		totalMidRight = nums1[n1Mid]
	} else {
		if nums1[n1Mid] < nums2[n2Mid] {
			totalMidRight = nums1[n1Mid]
		} else {
			totalMidRight = nums2[n2Mid]
		}
	}

	return float64(totalMidLeft+totalMidRight) / 2
}
