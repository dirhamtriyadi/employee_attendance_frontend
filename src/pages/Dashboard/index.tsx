import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import {
  attendanceCheckIn,
  attendanceCheckOut,
  dashboard,
} from "@/features/dashboardSlice";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

interface IModal {
  title: string;
  body: string;
  isShow: boolean;
}

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState<IModal>({
    title: "",
    body: "",
    isShow: false,
  });

  useEffect(() => {
    dispatch(dashboard())
      .unwrap()
      .catch(() => {});
  }, [dispatch]);

  const dashboardState = useAppSelector((state) => state.dashboard);
  const authState = useAppSelector((state) => state.auth);

  // Mendapatkan jam saat ini
  const today = dayjs().format("HH:mm:ss");

  return (
    <>
      {authState.user?.role === "superadmin" ? (
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <h1>Hai {authState.user.fullName}, selamat datang di dashboard!</h1>
        </div>
      ) : (
        <>
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <div className="flex aspect-video rounded-xl justify-center items-center">
              <Button
                onClick={() => {
                  if (!dashboardState.attendance) {
                    dispatch(attendanceCheckIn())
                      .unwrap()
                      .then(() => {
                        dispatch(dashboard());
                        setModal((prevModal) => ({
                          ...prevModal,
                          title: "Berhasil!",
                          body: "Anda berhasil check in pada hari ini!",
                          isShow: !prevModal.isShow,
                        }));
                      })
                      .catch(() => {});
                  } else {
                    setModal((prevModal) => ({
                      ...prevModal,
                      title: "Peringatan!",
                      body: "Anda sudah melakukan check in pada hari ini!",
                      isShow: !prevModal.isShow,
                    }));
                  }
                }}
              >
                Attendance Check In
              </Button>
            </div>
            <div className="flex aspect-video rounded-xl justify-center items-center">
              {today > dashboardState.work_schedule?.checkOutTime ? (
                <Button
                  onClick={() => {
                    if (!dashboardState.attendance) {
                      setModal((prevModal) => ({
                        ...prevModal,
                        title: "Peringatan!",
                        body: "Anda belum melakukan check in pada hari ini!",
                        isShow: !prevModal.isShow,
                      }));
                    } else if (
                      dashboardState.attendance &&
                      !dashboardState.attendance?.checkOutTime
                    ) {
                      dispatch(attendanceCheckOut())
                        .unwrap()
                        .then(() => {
                          dispatch(dashboard());
                          setModal((prevModal) => ({
                            ...prevModal,
                            title: "Berhasil!",
                            body: "Anda berhasil check out pada hari ini!",
                            isShow: !prevModal.isShow,
                          }));
                        })
                        .catch(() => {});
                    } else {
                      setModal((prevModal) => ({
                        ...prevModal,
                        title: "Peringatan!",
                        body: "Anda sudah melakukan check out pada hari ini!",
                        isShow: !prevModal.isShow,
                      }));
                    }
                  }}
                >
                  Attendance Check Out
                </Button>
              ) : null}
            </div>
          </div>
          <Modal
            title={modal.title}
            body={modal.body}
            isShow={modal.isShow}
            setModal={() =>
              setModal((prevModal) => ({
                ...prevModal,
                isShow: !prevModal.isShow,
              }))
            }
          />
        </>
      )}
    </>
  );
};

export default Dashboard;
