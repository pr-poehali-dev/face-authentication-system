
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, Camera, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FaceVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [verificationStage, setVerificationStage] = useState<
    "initializing" | "positioning" | "processing" | "success" | "blocked" | "failed"
  >("initializing");
  const [facePosStatus, setFacePosStatus] = useState<
    "too-far" | "too-close" | "good" | "not-found"
  >("not-found");
  const [progressValue, setProgressValue] = useState(0);
  const [message, setMessage] = useState("Инициализация камеры...");
  const [isNewUser] = useState(location.state?.isNewUser ?? true);

  // Запрос доступа к камере
  useEffect(() => {
    const initCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: 640, height: 480 },
          audio: false,
        });
        
        setStream(mediaStream);
        
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        
        // Имитация задержки инициализации системы распознавания
        setTimeout(() => {
          setVerificationStage("positioning");
          setMessage("Расположите лицо в центре экрана");
        }, 2000);
        
      } catch (error) {
        console.error("Ошибка доступа к камере:", error);
        setMessage("Не удалось получить доступ к камере. Пожалуйста, разрешите доступ к камере.");
      }
    };

    initCamera();

    // Отключение камеры при размонтировании компонента
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Имитация обработки распознавания лица
  useEffect(() => {
    let interval: number | undefined;
    
    if (verificationStage === "positioning") {
      // Имитация анализа положения лица
      interval = window.setInterval(() => {
        const status = ["too-far", "too-close", "good", "not-found"][Math.floor(Math.random() * 3)] as 
          "too-far" | "too-close" | "good" | "not-found";
        
        setFacePosStatus(status);
        
        if (status === "good") {
          setTimeout(() => {
            startProcessing();
          }, 1500);
        }
        
        switch (status) {
          case "too-far":
            setMessage("Пожалуйста, придвиньтесь ближе к камере");
            break;
          case "too-close":
            setMessage("Слишком близко, отодвиньтесь немного");
            break;
          case "good":
            setMessage("Отлично! Держите положение");
            break;
          case "not-found":
            setMessage("Лицо не обнаружено, посмотрите в камеру");
            break;
        }
      }, 1500);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [verificationStage]);

  const startProcessing = () => {
    setVerificationStage("processing");
    setMessage("Выполняется биометрическая верификация...");
    
    // Захват кадра и имитация анализа
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        // Устанавливаем размеры canvas равными размерам видео
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Рисуем текущий кадр видео на canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
    }
    
    // Имитация процесса верификации с индикатором прогресса
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 5;
      setProgressValue(progress);
      
      if (progress >= 100) {
        clearInterval(progressInterval);
        completeVerification();
      }
    }, 200);
  };

  const completeVerification = () => {
    // Имитация результата верификации
    // Для новых пользователей - успех, иначе случайный результат
    if (isNewUser) {
      // Для новых пользователей всегда успех при первой регистрации
      setVerificationStage("success");
      setMessage("Верификация успешно завершена!");
      
      // Перенаправление на страницу профиля
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } else {
      // Для существующих пользователей имитация проверки биометрии
      // 80% шанс успеха, 20% шанс блокировки (имитация несовпадения лица)
      const isVerified = Math.random() > 0.2;
      
      if (isVerified) {
        setVerificationStage("success");
        setMessage("Верификация успешно завершена!");
        
        // Перенаправление на страницу профиля
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setVerificationStage("blocked");
        setMessage("Верификация не пройдена. Лицо не соответствует зарегистрированной биометрии.");
      }
    }
  };

  const renderVerificationStatus = () => {
    switch (verificationStage) {
      case "initializing":
        return (
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 mr-2 text-avito-blue animate-spin" />
            <p className="text-lg">{message}</p>
          </div>
        );
        
      case "positioning":
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="relative mb-6">
              {facePosStatus === "good" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full border-4 border-green-500 animate-pulse" />
                </div>
              )}
              <p className="text-lg mb-2">{message}</p>
            </div>
          </div>
        );
        
      case "processing":
        return (
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg mb-4">{message}</p>
            <div className="w-full max-w-md mb-4">
              <Progress value={progressValue} className="h-2" />
            </div>
            <p className="text-sm text-gray-500">Не двигайтесь, идет сканирование...</p>
          </div>
        );
        
      case "success":
        return (
          <div className="flex flex-col items-center justify-center">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <p className="text-lg font-medium text-green-600">{message}</p>
            <p className="text-sm text-gray-500 mt-2">Переадресация на страницу профиля...</p>
          </div>
        );
        
      case "blocked":
        return (
          <div className="flex flex-col items-center justify-center">
            <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
            <p className="text-lg font-medium text-red-600">{message}</p>
            <p className="text-sm text-gray-500 mt-2 mb-6">
              Ваш аккаунт заблокирован для обеспечения безопасности.
            </p>
            <Button 
              onClick={() => navigate("/")} 
              variant="outline"
            >
              Вернуться на главную
            </Button>
          </div>
        );
        
      case "failed":
        return (
          <div className="flex flex-col items-center justify-center">
            <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
            <p className="text-lg font-medium text-red-600">{message}</p>
            <p className="text-sm text-gray-500 mt-2 mb-6">
              Пожалуйста, попробуйте еще раз с лучшим освещением.
            </p>
            <Button 
              onClick={() => setVerificationStage("initializing")}
            >
              Повторить
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 flex items-center justify-center bg-gray-50 py-12">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-center mb-6">
            {isNewUser ? "Регистрация биометрии" : "Проверка биометрии"}
          </h1>
          
          <div className="mb-8 text-center">
            <p className="text-gray-600">
              {isNewUser 
                ? "Для регистрации профиля необходима биометрическая верификация. Следуйте инструкциям для сканирования лица."
                : "Для входа в аккаунт необходима биометрическая верификация. Система сравнит ваше лицо с зарегистрированной биометрией."}
            </p>
          </div>
          
          <div className="flex flex-col items-center mb-6">
            {/* Видео с камеры */}
            <div className={`relative mb-6 ${verificationStage === "success" || verificationStage === "blocked" ? "hidden" : ""}`}>
              <div className="w-[640px] h-[480px] bg-black rounded-lg overflow-hidden">
                <video 
                  ref={videoRef}
                  autoPlay 
                  playsInline
                  muted 
                  className="w-full h-full object-cover"
                />
                
                {facePosStatus === "good" && verificationStage === "positioning" && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-64 h-64 rounded-full border-2 border-green-500 opacity-80" />
                    <div className="absolute w-64 h-64 rounded-full border-4 border-green-500 animate-pulse-ring opacity-50" />
                  </div>
                )}
                
                {/* Индикатор положения лица */}
                {verificationStage === "positioning" && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <div className={`px-4 py-2 rounded-full text-white text-sm font-medium ${
                      facePosStatus === "good" ? "bg-green-500" : 
                      facePosStatus === "not-found" ? "bg-red-500" : "bg-yellow-500"
                    }`}>
                      {facePosStatus === "good" ? "Идеальное положение" : 
                       facePosStatus === "too-far" ? "Придвиньтесь ближе" :
                       facePosStatus === "too-close" ? "Отодвиньтесь немного" : "Лицо не обнаружено"}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Скрытый canvas для захвата кадра */}
              <canvas ref={canvasRef} className="hidden" />
            </div>
            
            {/* Статус верификации */}
            <div className="mt-4">
              {renderVerificationStatus()}
            </div>
          </div>
          
          {/* Информация о системе безопасности */}
          {verificationStage !== "blocked" && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start">
                <Camera className="text-avito-blue mr-3 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Безопасность биометрической верификации</h3>
                  <p className="text-sm text-gray-600">
                    Система биометрической верификации защищает ваш аккаунт от несанкционированного доступа.
                    Все биометрические данные хранятся в зашифрованном виде и используются только для проверки личности.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FaceVerification;
