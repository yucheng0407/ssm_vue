/**
 * Created by yucheng on 2019/5/25.
 */

/**
 * 不使用递归的二分查找
 *title:commonBinarySearch
 *@param arr
 *@param key
 *@return 关键字位置
 */

function commonBinarySearch(arr, key,type) {
    var low = 0;
    var high = arr.length - 1;
    var middle = 0;			//定义middle

    if (key < arr[low] || key > arr[high] || low > high) {
        return -1;
    }

    while (low <= high) {
        middle = (low + high) / 2;
        if (arr[middle] > key) {
            //比关键字大则关键字在左区域
            high = middle - 1;
        } else if (arr[middle] < key) {
            //比关键字小则关键字在右区域
            low = middle + 1;
        } else {
            return middle;
        }
    }
    return -1;		//最后仍然没有找到，则返回-1
}
