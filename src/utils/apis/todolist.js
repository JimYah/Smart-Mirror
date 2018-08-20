export async function getTodoList () {
  // HACK: token
  const token = 'cda3294b2afe5f8abe314f1c2315d5b491ae1b3e'
  const res = await fetch(`https://beta.todoist.com/API/v8/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const result = await res.json()
  console.log(result)
  return result
}
