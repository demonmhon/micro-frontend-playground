import React, { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
  remoteName: string;
  expectedPort: number;
  devCommand: string;
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class RemoteErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[MFE Boundary] Remote "${this.props.remoteName}" crashed:`, error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="mfe-card"
          style={{
            border: '1px solid rgba(239, 68, 68, 0.4)',
            background: 'rgba(239, 68, 68, 0.06)',
            padding: '24px'
          }}
        >
          <div className="mfe-flex-between" style={{ marginBottom: '12px' }}>
            <div className="mfe-flex-gap">
              <span style={{ fontSize: '22px' }}>⚠️</span>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f87171' }}>
                  {this.props.remoteName} Outage (Port {this.props.expectedPort})
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Fault Isolation Active: The rest of the platform continues running without interruption.
                </p>
              </div>
            </div>
            <span className="mfe-badge mfe-badge-danger">Isolated Failure</span>
          </div>

          <div
            style={{
              padding: '12px 14px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '12px',
              color: '#fca5a5',
              marginBottom: '16px',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}
          >
            {this.state.error?.message || 'Remote module failed to load.'}
          </div>

          <div className="mfe-flex-gap">
            <button
              type="button"
              className="mfe-btn mfe-btn-danger mfe-btn-sm"
              onClick={this.handleRetry}
            >
              🔄 Retry Remote
            </button>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Or verify dev server: <code>{this.props.devCommand}</code>
            </span>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}