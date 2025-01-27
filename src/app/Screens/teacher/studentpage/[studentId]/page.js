// Screens/teacher/studentpage/[studentId]/page.js
import StudentDetail from './StudentDetail';

const StudentPage = async ({ params }) => {
  const { studentId } = await params; // Server Component mein params ko await kar rahe hain

  return <StudentDetail studentId={studentId} />;
};

export default StudentPage;
