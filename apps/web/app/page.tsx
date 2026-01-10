"use client";

import { useState, useEffect } from "react";
import Image, { type ImageProps as NextImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

type Props = Omit<NextImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

type HealthData = {
  status: string;
  database?:
    | {
        status: string;
        timestamp: string;
      }
    | {
        error: string;
      };
  timestamp: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;
  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch("http://localhost:3001/health");
        const data = await response.json();
        setHealthData(data);
      } catch (error: any) {
        setHealthData({
          status: "Error connecting to API",
          database: { error: error.message },
          timestamp: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ThemeImage
          className={styles.logo}
          srcLight="turborepo-dark.svg"
          srcDark="turborepo-light.svg"
          alt="Turborepo logo"
          width={180}
          height={38}
          priority
        />

        <div
          style={{
            padding: "20px",
            margin: "20px 0",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h2>Máquina Electoral Digital - Estado del Sistema</h2>

          {loading ? (
            <p>🔄 Verificando conexión con la base de datos...</p>
          ) : healthData ? (
            <div>
              <p>
                <strong>Estado API:</strong> {healthData.status}
              </p>
              {healthData.database && (
                <div>
                  <p>
                    <strong>Estado Base de Datos:</strong>{" "}
                    {"status" in healthData.database
                      ? healthData.database.status
                      : "Error"}
                  </p>
                  {"timestamp" in healthData.database && (
                    <p>
                      <strong>Última verificación:</strong>{" "}
                      {new Date(healthData.database.timestamp).toLocaleString()}
                    </p>
                  )}
                  {"error" in healthData.database && (
                    <p style={{ color: "red" }}>
                      <strong>Error:</strong> {healthData.database.error}
                    </p>
                  )}
                </div>
              )}
              <p>
                <strong>Timestamp:</strong>{" "}
                {new Date(healthData.timestamp).toLocaleString()}
              </p>
            </div>
          ) : (
            <p style={{ color: "red" }}>
              ❌ No se pudo obtener el estado del sistema
            </p>
          )}
        </div>

        <div className={styles.ctas}>
          <Button appName="web" className={styles.secondary}>
            Verificar Conexión
          </Button>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com/templates?search=turborepo&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://turborepo.com?utm_source=create-turbo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to turborepo.com →
        </a>
      </footer>
    </div>
  );
}
