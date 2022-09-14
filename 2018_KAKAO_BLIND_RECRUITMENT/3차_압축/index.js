// LTZ 압축 알고리즘..
// 간단하다는데 지금 수준에선 어려웠음 검색의 도움을 받아 해결
// TODO :: 압축 해제 알고리즘도 짜볼것.
function solution(msg) {
  const outputs = [];
  const dic = [
    '@',
    ...Array.from(Array(26), (_, i) => String.fromCharCode(65 + i))
  ];

  let [start, end] = [0, 1];

  // 사전에 인풋이 존재하는지 확인
  const existsDic = (start, end) => dic.includes(msg.substring(start, end));

  // 현재 start~end 가 사전에 없거나, 최대길이가 넘어가면 입력길이를 리턴.
  const getInput = (start, end) => {
    // 길이의 마지막이 메시지 길이보다 길거나.
    // 사전에 해당 길이 + 1의 문자가 존재하지 않는 경우.
    if (end + 1 > msg.length || !existsDic(start, end + 1)) return [start, end];
    // 사전에 해당 길이의 문자가 존재하는 경우 end + 1 하여 재검사.
    return getInput(start, end + 1);
  }

  // 사전에 입력된 길이의 문자가 없다면 사전에 입력
  const addToDic = (start, end) => {
    // 사전에 입력 길이의 문자가 있다면 리턴.
    if (existsDic(start, end)) return;
    // 사전에 입력 길이의 문자를 추가.
    dic.push(msg.substring(start, end));
  }

  // 사전에 존재하는 입력값을 추가
  const addToOutput = (start, end) => {
    // 사전에 추가하려는 입력값이 존재하는 경우 리턴
    if (!existsDic(start, end)) return;
    // 출력값에서 사전의 인덱스를 찾아 추가
    outputs.push(dic.indexOf(msg.substring(start, end)));
  }

  // 압축 시작
  while(start < msg.length) {
    // 문자를 추가하며 사전에 넣어야하는 입력 길이를 찾는다.
    [start, end] = getInput(start, end);
    // 사전에 해당 길이 + 1 (검증됨) 입력값을 추가.
    addToDic(start, end + 1);
    // 사전에 존재하는 현재 길이를 결과값으로 추가.
    addToOutput(start, end);
    start = end;
  }

  return outputs;
}


// Test
// [11, 1, 27, 15]
solution("KAKAO");

// [20, 15, 2, 5, 15, 18, 14, 15, 20, 27, 29, 31, 36, 30, 32, 34]
solution("TOBEORNOTTOBEORTOBEORNOT")

// [1, 2, 27, 29, 28, 31, 30]
solution("ABABABABABABABAB")
