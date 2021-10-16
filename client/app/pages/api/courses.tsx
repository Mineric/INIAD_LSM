// import styles from '../../styles/Jobs.module.css'

export const getStaticProps = async () => {
  const res = await fetch('http://127.0.0.1:8000/viewset/Dashboard/');
  const data = await res.json();

  return {
    props: { courses: data }
  }
}

const courses = ({ courses }) => {
  console.log(courses);

  return (
    <div>
      <h1>All courses</h1>
      {courses.map(c => (
        <div key={c.id}>
          <a>
            <h3>{ c.name }</h3>
          </a>
        </div>
      ))}
    </div>
  );
}
 
export default courses;