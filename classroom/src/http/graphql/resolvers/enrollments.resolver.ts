import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { CoursesService } from 'src/services/courses.service';
import { EnrollmentsService } from 'src/services/enrollments.service';
import { Enrollment } from '../models/enrollment';
import { StudentsService } from 'src/services/students.service';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(
    private enrollmentsService: EnrollmentsService,
    private coursesServices: CoursesService,
    private studentsServices: StudentsService,
  ) {}

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.enrollmentsService.listAllEnrollments();
  }

  @ResolveField()
  student(@Parent() enrollment: Enrollment) {
    return this.studentsServices.getStudentById(enrollment.studentId);
  }

  @ResolveField()
  course(@Parent() enrollmentt: Enrollment) {
    return this.coursesServices.getCourseById(enrollmentt.courseId);
  }
}
