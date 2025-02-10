import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { attendanceCheckIn, dashboard } from "@/features/dashboardSlice";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(dashboard())
      .unwrap()
      .then(() => {})
      .catch(() => {});
  }, [dispatch]);

  const dashboardState = useAppSelector((state) => state.dashboard);
  const authState = useAppSelector((state) => state.auth);

  return (
    <>
      {authState.user?.role === "superadmin" ? (
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <h1>Hai {authState.user.fullName}, selamat datang di dashboard!</h1>
        </div>
      ) : (
        <>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="flex aspect-video rounded-xl justify-center items-center">
              <Button
                onClick={() => {
                  !dashboardState.attendance
                    ? dispatch(attendanceCheckIn())
                    : setModal(!modal);
                }}
              >
                Attendance Check In
              </Button>
            </div>
            <div className="flex aspect-video rounded-xl justify-center items-center">
              <Button>Attendance Check Out</Button>
            </div>
          </div>
          <AlertDialog open={modal}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Peringatan!</AlertDialogTitle>
                <AlertDialogDescription>
                  Anda sudah melakukan check in pada hari ini!
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
                <AlertDialogAction onClick={() => setModal(!modal)}>
                  Oke
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </>
  );
};

export default Dashboard;
