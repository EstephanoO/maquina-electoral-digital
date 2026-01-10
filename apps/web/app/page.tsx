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
        connected?: boolean;
      }
    | {
        error: string;
      };
  timestamp: string;
  success?: boolean;
  message?: string;
  api?: {
    status: string;
    version: string;
    environment: string;
  };
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
        // Try local API first (development), then production fallback
        const apis = [
          "http://localhost:3001/api/status",
          "http://localhost:3001/health",
        ];

        let data = null;
        let apiUsed = "";

        for (const apiUrl of apis) {
          try {
            const response = await fetch(apiUrl, {
              mode: "cors",
            });
            if (response.ok) {
              data = await response.json();
              apiUsed = apiUrl;
              break;
            }
          } catch (e: any) {
            console.log(`Failed to connect to ${apiUrl}:`, e.message);
            continue;
          }
        }

        if (data) {
          console.log(`Connected to API: ${apiUsed}`);
          setHealthData(data);
        } else {
          throw new Error("Unable to connect to any API endpoint");
        }
      } catch (error: any) {
        console.error("API connection error:", error);
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
              {healthData.success ? (
                <div style={{ color: "green", marginBottom: "15px" }}>
                  <h3>✅ {healthData.message}</h3>
                </div>
              ) : (
                <div style={{ color: "red", marginBottom: "15px" }}>
                  <h3>❌ Error en el sistema</h3>
                  <p>
                    <strong>Estado:</strong> {healthData.status}
                  </p>
                </div>
              )}

              {healthData.database && (
                <div
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    margin: "10px 0",
                    borderRadius: "5px",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <h4>📊 Estado de la Base de Datos:</h4>
                  <p>
                    <strong>Conexión:</strong>{" "}
                    {"connected" in healthData.database ? (
                      healthData.database.connected ? (
                        <span style={{ color: "green" }}>✅ Conectada</span>
                      ) : (
                        <span style={{ color: "red" }}>❌ Desconectada</span>
                      )
                    ) : (
                      <span style={{ color: "orange" }}>⚠️ Desconocida</span>
                    )}
                  </p>
                  {"status" in healthData.database && (
                    <p>
                      <strong>Estado:</strong> {healthData.database.status}
                    </p>
                  )}
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

              {healthData.api && (
                <div
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    margin: "10px 0",
                    borderRadius: "5px",
                    backgroundColor: "#f0f8ff",
                  }}
                >
                  <h4>🔧 Estado de la API:</h4>
                  <p>
                    <strong>Estado:</strong>{" "}
                    <span
                      style={{
                        color:
                          healthData.api.status === "healthy" ? "green" : "red",
                      }}
                    >
                      {healthData.api.status === "healthy"
                        ? "✅ Funcionando"
                        : "❌ Error"}
                    </span>
                  </p>
                  <p>
                    <strong>Versión:</strong> {healthData.api.version}
                  </p>
                  <p>
                    <strong>Ambiente:</strong> {healthData.api.environment}
                  </p>
                </div>
              )}

              <p>
                <strong>Timestamp General:</strong>{" "}
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
