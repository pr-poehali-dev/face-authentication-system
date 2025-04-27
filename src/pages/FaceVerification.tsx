
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, Camera, Loader2, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FaceVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [verificationStage, setVerificationStage] = useState<
    "initializing" | "positioning" | "liveness" | "processing" | "success" | "blocked" | "failed"
  >("initializing");
  const [facePosStatus, setFacePosStatus] = useState<
    "too-far" | "too-close" | "good" | "not-found"
  >("not-found");
  const [progressValue, setProgressValue] = useState(0);
  const [message, setMessage] = useState("Инициализация камеры...");
  const [isNewUser] = useState(location.state?.isNewUser ?? true);
  const [livenessAction, setLivenessAction] = useState<
    "blink" | "smile" | "turn-left" | "turn-right" | "nod" | "completed"
  >("blink");
  const [livenessProgress, setLivenessProgress] = useState(0);
  const [capturedFrames, setCapturedFrames] = useState<string[]>([]);

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
            captureFrame();
            setVerificationStage("liveness");
            setMessage("Проверка на живое лицо. Пожалуйста, моргните");
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

  // Имитация проверки на живое лицо (liveness detection)
  useEffect(() => {
    let interval: number | undefined;
    
    if (verificationStage === "liveness") {
      interval = window.setInterval(() => {
        if (livenessAction === "completed") {
          clearInterval(interval);
          return;
        }
        
        // Имитация распознавания действия пользователя
        const randomSuccess = Math.random() > 0.3; // 70% вероятность успеха
        
        if (randomSuccess) {
          setLivenessProgress(prev => {
            const newProgress = prev + 33;
            if (newProgress >= 100) {
              captureFrame();
              startProcessing();
              return 100;
            }
            
            // Переход к следующему действию
            if (newProgress >= 33 && newProgress < 66) {
              captureFrame();
              setLivenessAction("smile");
              setMessage("Отлично! Теперь улыбнитесь");
            } else if (newProgress >= 66 && newProgress < 100) {
              captureFrame();
              setLivenessAction("turn-right");
              setMessage("Хорошо! Поверните голову вправо");
            }
            
            return newProgress;
          });
        }
      }, 2000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [verificationStage, livenessAction]);

  const captureFrame = () => {
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
        
        // Получаем изображение в формате base64
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedFrames(prev => [...prev, imageData]);
      }
    }
  };

  const startProcessing = () => {
    setLivenessAction("completed");
    setVerificationStage("processing");
    setMessage("Выполняется биометрическая верификация...");
    
    // Захват финального кадра
    captureFrame();
    
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

  const renderLivenessCheck = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md mb-6">
          <h3 className="text-lg font-medium mb-2">Проверка на живое лицо</h3>
          <Progress value={livenessProgress} className="h-2 mb-2" />
          <p className="text-sm text-gray-500">
            {livenessAction === "blink" && "Пожалуйста, моргните несколько раз"}
            {livenessAction === "smile" && "Пожалуйста, улыбнитесь"}
            {livenessAction === "turn-right" && "Поверните голову вправо"}
            {livenessAction === "turn-left" && "Поверните голову влево"}
            {livenessAction === "nod" && "Кивните головой"}
            {livenessAction === "completed" && "Проверка завершена!"}
          </p>
        </div>
        
        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {livenessAction === "blink" && (
              <div className="flex flex-col items-center">
                <span className="text-sm bg-black/70 text-white px-2 py-1 rounded mb-2">Моргните</span>
                <div className="w-24 h-10 border-2 border-yellow-500 rounded-md opacity-80" />
              </div>
            )}
            {livenessAction === "smile" && (
              <div className="flex flex-col items-center">
                <span className="text-sm bg-black/70 text-white px-2 py-1 rounded mb-2">Улыбнитесь</span>
                <div className="w-24 h-10 border-2 border-yellow-500 rounded-full opacity-80 mt-16" />
              </div>
            )}
            {livenessAction === "turn-right" && (
              <div className="flex flex-col items-center">
                <span className="text-sm bg-black/70 text-white px-2 py-1 rounded mb-2">Вправо</span>
                <div className="flex items-center">
                  <div className="w-32 h-32 border-2 border-yellow-500 rounded-full opacity-80" />
                  <div className="w-8 h-8 bg-yellow-500/50 rounded-full ml-4 animate-pulse" />
                </div>
              </div>
            )}
          </div>
        </div>
        
        <p className="text-sm text-gray-500 mt-2">
          Выполните действие, которое запрашивает система
        </p>
      </div>
    );
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
        
      case "liveness":
        return renderLivenessCheck();
        
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
                <Shield className="text-avito-blue mr-3 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Безопасность биометрической верификации</h3>
                  <p className="text-sm text-gray-600">
                    Система биометрической верификации с проверкой на живое лицо (Liveness Detection) защищает от использования фотографий и 
                    видеозаписей для обхода системы. Все действия выполняются в режиме реального времени для подтверждения, что перед камерой 
                    находится реальный человек, а не его изображение.
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
