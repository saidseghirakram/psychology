declare module '@react-map/algeria' {
  interface AlgeriaProps {
    type: 'select-single' | 'select-multiple';
    size: string | number;
    hoverColor?: string;
    selectColor?: string;
    cityColors?: Record<string, string>;
    strokeColor?: string;
    hints?: boolean;
  }

  const Algeria: React.FC<AlgeriaProps>;
  export default Algeria;
} 