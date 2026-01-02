import axios from 'axios'
// 서블릿에게 부서 등록 요청하기
export const deptInsertDB = async (data) => {
  console.log(data)
  try {
    const res = await axios({
      method: 'post',
      url: process.env.REACT_APP_SPRING_IP+'deptInsert',
      data: data
    })
    console.log(res.data)
    return res
  } catch (error) {
    console.error("부서등록 실패!!!", error)    
  }
}//end of deptInsertDB

export const deptUpdateDB = async (data) => {
  console.log(data)
  try {
    const res = await axios({
      method: 'put',
      url: process.env.REACT_APP_SPRING_IP+'deptUpdate',
      data: data
    })
    console.log(res.data)
    return res
  } catch (error) {
    console.error("부서등록 실패!!!", error)    
  }
}//end of deptInsertDB


export const deptListDB = async (data) => {
  console.log(data)
  
  try {
    const res = await axios({
      method: 'get',
      url: process.env.REACT_APP_SPRING_IP+'dept/deptList',
      params: data
    })
    console.log(res.data)
    return res 
  } catch (error) {
    console.error("부서목록 가져오기 실패!!!", error)
    //호출한 쪽에서 catch하도록 다시 던져 줄때
    throw error
  }
    
}//end of deptListDB

// delete from dept where deptno = 61
export const deptDeleteDB = async (deptno) => {
  console.log(deptno) // 61번
  try {
    const res = await axios({
      method: 'delete',
      url: process.env.REACT_APP_SPRING_IP+'deptDelete',
      params: {'deptno': deptno}
    })
    console.log(res.data)
    return res 
  } catch (error) {
    console.error("부서삭제 실패!!!", error)
    //호출한 쪽에서 catch하도록 다시 던져 줄때
    throw error
  }
}//end of deptListDB