'use strict'

// ---------------------------------------------------------------------------------------------------------------------

/**
   * @param {Array<number>} ??? - 数字の配列
   * @returns {Array<number>} 与えられた配列の要素を昇順に並べた新しい配列
   */

// startIndexは基本0 (← Arrayの最初の要素)
// endIndexは「Array.length-1」に同じ
function quickSort(startIndex, endIndex) {

  // ピボットとするアレイインデックス番号を指定
  // 例えば、インデックス番号が[0]から[99]の100要素であれば、(99+1)/2=50番目がピボットとなる
  let pivot = arrayToQuickSort[Math.floor((startIndex + endIndex) / 2)];
  // let pivot = (Math.min(...inputArray) + Math.max(...inputArray))/2;

  // left と right を設定
  // 1回目は「left=0」/「right=len-1」
  let left = startIndex;
  let right = endIndex;

  // console.log("--------------------------------")
  // console.log("pivot: ", pivot);
  // console.log("left: ", left);
  // console.log("right: ", right);

  // 無限Loopを意図的に作成
  // breakするまで、同じ処理を繰り返す
  // ピポットより小さい値を左側へ
  // ピボットより大きい値を右側へ
  while (true) {

    // leftの値がpivotより小 ⇒ leftのインデックス番号を一つ増やす (※ 1つ右へ移動) 
    while (arrayToQuickSort[left] < pivot) {
      left++;
    }
    // rightの値がpivotより小 ⇒ rightのインデックス番号を一つ減らす (※ 1つ左へ移動) 
    while (pivot < arrayToQuickSort[right]) {
      right--;
    }
    // leftのインデックス番号とrightのインデックス番号がぶつかったら、無限ループを脱出
    // 函数の再帰呼び出しの行へ移動
    // 函数を再帰する度に、2のべき乗個のグループに分かれて行く
    if (right <= left) {
      break;
    }

    // left・rightの値がぶつかっていない場合、leftとrightを交換 (swapping)
    // 交換後にleftを後ろへ、rightを前へ一つ移動
    // 値交換に関しては、1行で済む書き方も恐らくありそう [2023年3月24日]
    let temporaryVariable = arrayToQuickSort[left];
    arrayToQuickSort[left] = arrayToQuickSort[right];
    arrayToQuickSort[right] = temporaryVariable;

    // while(true)直下の行からの処理に向け、leftとrightをインクリメントしておく
    left += 1;
    right -= 1;
  }

  // 左側のグループ(=ピボットより小さな値の列)に分割できるデータがある場合、
  // quickSort自身をquickSortの中で呼び出し、再帰的に処理を繰り返す
  if (startIndex < left - 1) {
    quickSort(startIndex, left - 1);
  }

  // 右側のグループ(=ピボットより大きな値の列)に分割できるデータがある場合、
  // quickSort自身をquickSortの中で呼び出し、再帰的に処理を繰り返す
  if (right + 1 < endIndex) {
    quickSort(right + 1, endIndex);
  }

}



// ---------------------------------------------------------------------------------------------------------------------
function selectionSort(inputArray) {
// 昇順にソートする
// アレイ内の最小値を見つけて(=選択して)、初回forのイテレータ(=iの事。アレイの先頭)に移して行く

  // セレクションソートの開始時刻を変数に持たせる
  // 変更されたくないので、constで宣言
  // performance.now() メソッドは、ミリ秒単位で計測された DOMHighResTimeStamp を返します。
  // https://developer.mozilla.org/ja/docs/Web/API/Performance/now
  const start = performance.now();

  // アレイの最初の要素から順番に見て行く
  for (let i = 0; i <= inputArray.length - 1; i++) {
    // 一先ず、iのインデックス番号の要素を最小値としておく
    let minValueIndex = i;

    for (let j = i + 1; j <= inputArray.length - 1; j++) {
      if (inputArray[j] < inputArray[minValueIndex]) {
        // もし、最小値としたインデックス番号の要素より、さらに小さな要素が見つかったら
        // minValueIndexを、そのインデックス番号で更新
        minValueIndex = j;
      }
    }
    // 2回目のforを抜けた時点で、minValueIndexには、真の最小値の要素インデックスが入っている

    // 2要素のスワッピングで、最初の要素 (← i=1, 2, 3...) をアレイの先頭へ移動
    // iは 1, 2, 3... と増えて行く
    let tmp = inputArray[i];
    inputArray[i] = inputArray[minValueIndex];
    inputArray[minValueIndex] = tmp;

  }

  const end = performance.now();
  console.log("セレクションソートの処理時間: ", end - start);
}



// ---------------------------------------------------------------------------------------------------------------------
function bubbleSort(inputArray){
// アレイの隣接2要素を大小比較して行く
// 昇順ソートするので、大きな方を右にずらして行く

  const start=performance.now();

  // 最初のforのイテレータ: i は、精査して行くアレイの先頭インデックス番号に対応
  // i=1で1番小さな値がアレイの先頭に来る
  // i=2で2番目に小さな値がアレイの2番目に来る
  // i=3で3番目に小さな値がアレイの3番目に来る... (※ 以下同様)
  for (let i = 0; i<=inputArray.length-1; i++){
    for (let j = 0; j<=inputArray.length-1; j++){
      if (inputArray[j]>inputArray[j+1]){
        let tmp =inputArray[j];
        inputArray[j]=inputArray[j+1];
        inputArray[j+1]=tmp;
      }
    }
  }

  const end=performance.now();
  console.log("バブルソートの処理時間: ", end-start);

}



// ---------------------------------------------------------------------------------------------------------------------
function generateArray(min = 0, max, length) {

  const array = [];

  for (let i = 0; i < length; i++) {
    array.push(Math.floor(Math.random() * Math.floor(max)))
  }

  return array;
}
// console.log(generateArray(0,10000,10000));



// ---------------------------------------------------------------------------------------------------------------------
const arrayToQuickSort = generateArray(0, 10000, 10000);
const start = performance.now();
console.log("クイックソート前: ", arrayToQuickSort);
quickSort(0, arrayToQuickSort.length - 1)
console.log("クイックソート後: ", arrayToQuickSort);
const end = performance.now();
console.log("クイックソートの処理時間: ", end - start);



// ---------------------------------------------------------------------------------------------------------------------
const arrayToSelectionSort = generateArray(0, 10000, 10000);
console.log("選択ソート前: ", arrayToSelectionSort);
selectionSort(arrayToSelectionSort)
console.log("選択ソート後: ", arrayToSelectionSort);


// ---------------------------------------------------------------------------------------------------------------------
const arrayToBubbleSort=generateArray(0, 10000, 10000);
console.log("バブルソート前: ", arrayToBubbleSort);
bubbleSort(arrayToBubbleSort)
console.log("バブルソート後: ", arrayToBubbleSort);




