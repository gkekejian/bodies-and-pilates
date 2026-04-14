'use client';
import { useEffect, useState, Component } from 'react';
import loadMBody from '@/lib/mindbody-loader';

// ErrorBoundary
class ScheduleErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError)
      return (
        <div className="text-center py-12">
          <p className="text-charcoal-800 mb-4">Schedule failed to load.</p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
            className="bg-sage-700 text-cream-50 px-6 py-2 rounded"
          >
            Reload
          </button>
        </div>
      );
    return this.props.children;
  }
}

// Cast the custom element as an unknown React component to avoid namespace lint errors
const HealcodeWidget = 'healcode-widget' as unknown as React.FC<{
  'data-type': string;
  'data-widget-partner': string;
  'data-widget-id': string;
  'data-widget-version': string;
}>;

export default function MindbodySchedule({ widgetId }: { widgetId: string }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    loadMBody(() => setLoaded(true));
  }, []);
  if (!loaded) return <div className="h-96 bg-cream-100 animate-pulse rounded-lg" />;
  return (
    <ScheduleErrorBoundary>
      <HealcodeWidget
        data-type="schedules"
        data-widget-partner="object"
        data-widget-id={widgetId}
        data-widget-version="0"
      />
    </ScheduleErrorBoundary>
  );
}
