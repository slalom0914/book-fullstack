import { useEffect, useState } from 'react'
import { deptListDB } from '../../service/deptLogic'
import styles from './dept.module.css'
import DeptRow from './DeptRow'
import { Button, Modal } from 'react-bootstrap'
import { MyInput, MyLabel, MyLabelAb } from '../style/FormStyle'

const DeptList = () => {
  const [deptList, setDeptList] = useState([])
  const [ deptno, setDeptno ] = useState(0)
  const [ dname, setDname] = useState('')
  const [ loc, setLoc] = useState('')
  useEffect(() => {
    const getDeptList = async() => {
      const dept = {
        deptno: 0,
        dname: null,
        loc: null
      }
      const res = await deptListDB(dept)
      console.log(res)
      setDeptList(res)
      //console.log(res.data)
    }
    getDeptList()
  },[])//의존성배열이 빈통이면 최초 한 번만 호출된다.
  const jsonDeptList = () => {

  }

  const reactSearch = () => {
    
  }
  //모달 관련 상태
  const [ show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // 사용자가 입력한 부서 정보를 객체 리터럴로 담아서 서버에 전송한다.
  // json -> 객체
  // 객체 -> json
  const deptInsert = async () => {

  }
  const handleDeptno = (value) => {
    setDeptno(value)
  }

  const handleDname = (value) => {
    setDname(value)
  }

  const handleLoc = (value) => {
    setLoc(value)
  }

  return (
    <>
      <div className="container">
	    <div className="page-header">
      <h2>부서관리&nbsp;<i className="fa-solid fa-angles-right"></i>&nbsp;<small>부서목록</small></h2>
        <hr />
	    </div>      
      <div className="row">
        <div className="col-3">
          <select id="gubun" className="form-select" aria-label="분류선택">
            <option defaultValue>분류선택</option>
            <option value="deptno">부서번호</option>
            <option value="dname">부서명</option>
            <option value="loc">지역</option>
          </select>			
        </div>
		    <div className="col-6">
			    <input type="text" id="keyword" className="form-control" placeholder="검색어를 입력하세요" 
                 aria-label="검색어를 입력하세요" aria-describedby="btn_search" />
		    </div>
		    <div className="col-3">
			    <button className='btn btn-danger' id="btn_search" onClick={reactSearch}>검색</button>
		    </div>
	     </div> 
      <div className={styles.deptlist}>
        <table className='table'>
          <thead>
            <tr>
              <th>부서번호</th>
              <th>부서명</th>
              <th>지역</th>
            </tr>
          </thead>
          <tbody>
          {deptList.map(dept => (
            <DeptRow key={dept.deptno} dept={dept} />
          ))}
          </tbody>
        </table> 
        <hr />    
        <div className={styles.footer}>
          <button className="btn btn-warning" onClick={jsonDeptList}>
            전체조회
          </button>&nbsp; 
          <button className="btn btn-success" onClick={()=> console.log('등록 모달 호출')}>
            부서등록
          </button> 
        </div>
      </div>
      </div>
      {/* ========================== [[ 도서등록 Modal ]] ========================== */}
      <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>부서등록</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            <div style={{display: 'flex'}}>
              <MyLabel>부서번호
                <MyInput type="text" id="deptno" placeholder="Enter 부서번호" onChange={(e)=>{handleDeptno(e.target.value)}} />
              </MyLabel>
            </div>
            <div style={{display: 'flex'}}>
              <MyLabel>부서명
                <MyInput type="text" id="dname" placeholder="Enter 부서명" onChange={(e)=>{handleDname(e.target.value)}}/>
              </MyLabel>
            </div>
            <div style={{display: 'flex'}}>
              <MyLabel>지역
                <MyInput type="text" id="loc" placeholder="Enter 지역" onChange={(e)=>{handleLoc(e.target.value)}}/>
              </MyLabel>
            </div>
          </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              닫기
            </Button>
            <Button variant="primary" onClick={deptInsert}>
              저장
            </Button>
          </Modal.Footer>
        </Modal>     
      {/* ========================== [[ 부서등록 Modal ]] ========================== */}    
    </>
  )
}

export default DeptList
