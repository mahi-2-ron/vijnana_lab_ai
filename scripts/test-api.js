fetch('http://localhost:5000/api/users/create-teacher', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "test teacher",
    email: "test555@vijnanalab.com",
    password: "TestTeacher123!"
  })
})
.then(res => res.text())
.then(body => console.log('Response:', body))
.catch(err => console.error('Request error:', err.message));
