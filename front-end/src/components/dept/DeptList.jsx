import { useEffect, useState } from 'react'
import { deptInsertDB, deptListDB } from '../../service/deptLogic'
import styles from './dept.module.css'
import DeptRow from './DeptRow'
import { Button, Modal } from 'react-bootstrap'
import { MyInput, MyLabel, MyLabelAb } from '../style/FormStyle'
import { useNavigate } from 'react-router'

const DeptList = () => {
  const navigate = useNavigate()
  const [deptList, setDeptList] = useState([])
  const [ deptno, setDeptno ] = useState(0)
  const [ dname, setDname] = useState('')
  const [ loc, setLoc] = useState('')
  // 사용자 입력한 검색어 담기
  const [keyword,setKeyword] = useState('')
  // deptno, dname, loc
  const [searchType, setSearchType] = useState('')
  //등록이 성공하면 상태값을 0에서 1로 변경해줌 - 새로 렌더링이 일어난다.
  //부서목록을 가져오는 useEffect에 의존성 배열에 state추가해줌.
  const [state, setState] = useState(0)
  const getDeptList = async() => {
    const dept = {
      deptno: 0,
      dname: null,
      loc: null,
      searchType: searchType,
      keyword: keyword,
    }
    const res = await deptListDB(dept)
    console.log(res)
    setDeptList(res)
    //console.log(res.data)
  }
  
  useEffect(() => {
    //state가 변하면 getDeptList() 다시 호출됨.
    //0(초기값)-> 1 -> 2 -> 3
    getDeptList()
  },[keyword, searchType, state])//의존성배열이 빈통이면 최초 한 번만 호출된다.
  const jsonDeptList = () => {

  }
  // 검색 버튼을 클릭했을 때 호출되는 함수
  // 만일 키워드 입력 후 엔터 했을 때 호출하려면 form태그로 묶어서 submit처리함
  const reactSearch = () => {
    console.log('reactSearch  호출')
    getDeptList()
  }
  //모달 관련 상태
  const [ show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)


  // 사용자가 입력한 부서 정보를 객체 리터럴로 담아서 서버에 전송한다.
  // json -> 객체
  // 객체 -> json
  const deptInsert = async () => {
    //사용자 입력한 값을 useState로 처리하고 여기서 사용함
    const dept = {
      deptno: deptno,
      dname: dname,
      loc: loc
    }
    //모달 자동으로 닫기 
    handleClose()
    const res = await deptInsertDB(dept)
    if(res !== 1) console.log('부서등록에 실패하였습니다.')
    else {
      navigate('/dept')
      //useState는 이전 상태값을 기억하고 있다.
      setState((prev)=> prev + 1)
      //window.location.reload(); 비추:SPA장점 없음, 더 중요한 건 상태값 다 날아감.
    }
  }//end of depInsert
  
  const handleDeptno = (value) => {
    setDeptno(value)
  }

  const handleDname = (value) => {
    setDname(value)
  }

  const handleLoc = (value) => {
    setLoc(value)
  }
  // 조건 검색 후에 keyword와 searchType에 대한 초기화
  const handleReset = () => {
    setKeyword('')
    setSearchType('')
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
          <select id="gubun" 
            onChange={(event)=>{setSearchType(event.target.value)}}//deptno, dname, loc
            className="form-select" aria-label="분류선택"
            value={searchType}
          >
            <option defaultValue>분류선택</option>
            <option value="deptno">부서번호</option>
            <option value="dname">부서명</option>
            <option value="loc">지역</option>
          </select>			
        </div>
		    <div className="col-6">
			    <input type="text" id="keyword" className="form-control" placeholder="검색어를 입력하세요" 
            onChange={(event)=>{setKeyword(event.target.value)}}
            aria-label="검색어를 입력하세요" aria-describedby="btn_search" 
            value={keyword}
          />
		    </div>
		    <div className="col-3">
			    <button className='btn btn-danger' id="btn_search" onClick={reactSearch}>검색</button>
          &nbsp;
          <button className='btn btn-dark' onClick={handleReset} >
            초기화
          </button>
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
          <button className="btn btn-success" onClick={handleShow}>
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
