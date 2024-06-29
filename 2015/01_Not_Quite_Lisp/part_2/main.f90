!!!
! Author: happ_2h https://github.com/happ-2h
!
! Solution for Advent of Code Day 1.2
!!!

program notquitelisp
  implicit none

  integer :: floor, i, opstat
  character(len=7000) :: cc

  floor = 0
  i = 1

  open(1, file="../input.txt", status="old", action="read", iostat=opstat)
  if (opstat > 0) stop "Cannot open file input.txt"

    read(1, *) cc

    ! While above basement level
    do while (floor .ge. 0)
      if (cc(i:i) .eq. "(") then ! Ascend
        floor = floor + 1
      else                       ! Descend
        floor = floor - 1
      end if
      i = i + 1                  ! Get next character
    end do

    write(*,*) i - 1 ! Position starts at 1

  close(1)

end program notquitelisp