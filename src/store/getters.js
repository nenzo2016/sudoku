const getters = {
  result: state=>nd => state.subject.data[nd].result,
  initial:state=> nd => state.subject.data[nd].initial,
  history: state=>nd => state.subject.data[nd].history,
  data: state=> state.subject.data,
  subject: state=> state.subject,
}
export default getters
