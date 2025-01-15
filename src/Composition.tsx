import React, { useEffect } from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const unfakeBranding = {
  name: "Unfake",
  url: "unfake.dev",
  logo: "https://ik.imagekit.io/oq1pyotaq/unfake/unfake-logo-shield.png",
};

type UnfakeResponse = {
  data: {
    email: string;
    domain: string;
    allowed: boolean;
  };
  meta: {
    disposable: boolean;
    mxRecordExists: boolean;
    isPublicDomain: boolean;
  };
};

type Props = {
  readonly email: string;
};

export const MyComposition: React.FC<Props> = ({ email }) => {
  const [emailStatus, setEmailStatus] = React.useState<{
    status: 'loading' | 'valid' | 'invalid';
    details?: UnfakeResponse;
  }>({ status: 'loading' });

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  useEffect(() => {
    const checkEmail = async () => {
      try {
        const response = await fetch(`https://api.unfake.dev/check/${email}`);
        const data: UnfakeResponse = await response.json();
        
        setEmailStatus({
          status: data.data.allowed ? 'valid' : 'invalid',
          details: data
        });
      } catch (error) {
        setEmailStatus({ status: 'invalid' });
      }
    };

    checkEmail();
  }, [email]);

  const scale = spring({
    fps,
    frame: frame - 10,
    config: {
      damping: 100,
    },
  });

  const opacity = interpolate(frame, [30, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const getStatusText = () => {
    if (emailStatus.status === 'loading') return 'Verifying...';
    if (emailStatus.status === 'valid') return 'VERIFIED';
    
    const details = emailStatus.details?.meta;
    if (details?.disposable) return 'DISPOSABLE EMAIL DETECTED';
    if (!details?.mxRecordExists) return 'INVALID MX RECORD';
    if (!details?.isPublicDomain) return 'INVALID DOMAIN';
    
    return 'INVALID';
  };

  return (
    <AbsoluteFill
      style={{
        scale: String(scale),
        backgroundColor: 'white',
        fontFamily: 'Arial, sans-serif',
        padding: 40,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          height: '85%',
          border: '2px solid #333',
          borderRadius: 8,
          padding: 40,
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Watermark */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-45deg)',
            fontSize: 150,
            opacity: 0.03,
            color: '#000',
            whiteSpace: 'nowrap',
          }}
        >
          UNFAKE VERIFICATION
        </div>

        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: 40,
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 48,
                color: emailStatus.status === 'valid' ? '#2E8B57' : '#D9534F',
                fontWeight: 'bold',
                letterSpacing: 4,
              }}
            >
              {getStatusText()}
            </div>
            <div
              style={{
                fontSize: 24,
                color: '#666',
                marginTop: 10,
              }}
            >
              CERTIFICATE OF VERIFICATION
            </div>
          </div>
          <Img
            src={unfakeBranding.logo}
            style={{
              height: 100,
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Main Content */}
        <div style={{ width: '100%', marginTop: 20 }}>
          <div style={{ fontSize: 24, color: '#444', marginBottom: 20 }}>
            This is to certify that
          </div>
          <div
            style={{
              fontSize: 36,
              color: '#000',
              marginBottom: 30,
              opacity,
            }}
          >
            {email}
          </div>
          <div style={{ fontSize: 24, color: '#444', lineHeight: 1.5 }}>
            has been verified by Unfake to be {emailStatus.status === 'valid' ? 'a valid' : 'an invalid'} {emailStatus.details?.data.email ? "email address" : "domain"}.
            {emailStatus.details && (
              <div style={{ marginTop: 20, fontSize: 20, color: '#666' }}>
                Domain: {emailStatus.details.data.domain}
                {emailStatus.status === 'invalid' && (
                  <div style={{ marginTop: 10, color: '#D9534F' }}>
                    {emailStatus.details.meta.disposable && ' • Disposable Email Provider'}
                    {!emailStatus.details.meta.mxRecordExists && ' • Missing MX Records'}
                    {!emailStatus.details.meta.isPublicDomain && ' • Non-public Domain'}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 'auto',
            borderTop: '1px solid #ddd',
            paddingTop: 20,
            width: '100%',
            textAlign: 'center',
            color: '#666',
          }}
        >
          Verified by Unfake • {new Date().toLocaleDateString()} <br />
          <a href="https://unfake.dev" style={{ color: '#666', textDecoration: 'none' }}>
            For more information or to report an anomaly, please contact us at support@unfake.dev
          </a>
        </div>
      </div>
    </AbsoluteFill>
  );
};