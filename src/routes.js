import index from './components/index'
import ForumExplore from './components/ForumExplore'
import AdminPage from './components/AdminPage'
import AdminUserManagementPage from './components/AdminUserManagementPage'
import ForumDetail from './components/ForumDetail'
import ForumList from './components/ForumList'
import StudentCourseDetail from './components/StudentCourseDetail'
import StudentCourseList from './components/StudentCourseList'
import StudentHomework from './components/StudentHomework'
import StudentIndex from './components/StudentIndex'
import StudentScoreHomework from './components/StudentScoreHomework'
import StudentTest from './components/StudentTest'
import StudentTestDetail from "./components/StudentTestDetail.vue"
import TeacherAddClass from './components/TeacherAddClass'
import TeacherCourseDetail from './components/TeacherCourseDetail'
import TeacherCourseList from './components/TeacherCourseList'
import TeacherIndex from './components/TeacherIndex'
import TeacherManageGroup from './components/TeacherManageGroup'
import TeacherScoreHomework from './components/TeacherScoreHomework'
import TeacherScoreTest from './components/TeacherScoreTest'
import TeacherSendAnnouncement from './components/TeacherSendAnnouncement'
import UserInfo from './components/UserInfo'

import UserLogin  from './components/UserLogin'
import UserRegister from './components/UserRegister'
import UserResetPassword from './components/UserResetPassword'
import UserResetPasswordEmailVerify from './components/UserResetPasswordEmailVerify'

import AdminAddCourse from './components/AdminAddCourse'
import AdminCourseStudentManagement from './components/AdminCourseStudentManagement'
import AdminDeleteCourse from './components/AdminDeleteCourse'
import AdminReleaseNotice from './components/AdminReleaseNotice'
import AdminSetTARole from './components/AdminSetTARole'
import AdminSetTeacherRole from './components/AdminSetTeacherRole'

import TeacherAddHomework from './components/TeacherAddHomework'
import TeacherAddTest from './components/TeacherAddTest'


export default [
  {path: '/', component: index},
  {path: '/AdminPage', component: AdminPage},
  {path: '/AdminPageUserManagement', component:AdminUserManagementPage},
  {path: '/ForumExplore', component: ForumExplore},
  {path: '/ForumDetail', component: ForumDetail},
  {path: '/ForumList', component: ForumList},
  {path: '/StudentCourseDetail', component: StudentCourseDetail},
  {path: '/StudentCourseList', component: StudentCourseList},
  {path: '/StudentHomework', component: StudentHomework},
  {path: '/StudentIndex', component: StudentIndex},
  {path: '/StudentScoreHomework', component: StudentScoreHomework},
  {path: '/StudentTest', component: StudentTest},
  {path: '/StudentTestDetail', component: StudentTestDetail},
  {path: '/TeacherAddClass', component: TeacherAddClass},
  {path: '/TeacherCourseDetail', component: TeacherCourseDetail},
  {path: '/TeacherCourseList', component: TeacherCourseList},
  {path: '/TeacherIndex', component: TeacherIndex},
  {path: '/TeacherManageGroup', component: TeacherManageGroup},
  {path: '/TeacherScoreHomework', component: TeacherScoreHomework},
  {path: '/TeacherScoreTest', component: TeacherScoreTest},
  {path: '/TeacherSendAnnouncement', component: TeacherSendAnnouncement},

  {path: '/AdminAddCourse', component: AdminAddCourse},
  {path: '/AdminCourseStudentManagement', component: AdminCourseStudentManagement},
  {path: '/AdminDeleteCourse', component:AdminDeleteCourse},
  {path: '/AdminReleaseNotice', component:AdminReleaseNotice},
  {path: '/AdminSetTARole', component: AdminSetTARole},
  {path: '/AdminSetTeacherRole', component: AdminSetTeacherRole},

  {path: '/UserInfo', component: UserInfo},
  {path: '/UserLogin', component: UserLogin},
  {path: '/UserRegister', component: UserRegister},
  {path: '/UserResetPassword', component: UserResetPassword},
  {path: '/UserResetPasswordEmailVerify', component: UserResetPasswordEmailVerify},

  {path: '/TeacherAddHomework', component: TeacherAddHomework},
  {path: '/TeacherAddTest', component: TeacherAddTest},

]
