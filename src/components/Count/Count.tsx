import { memo } from 'react';

import { Icon } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';

import './Count.scss';

export interface CountProps {
  count: number;
  icon?: SemanticICONS;
  title?: string;
  className?: string;
}

const getDisplayCount = (count: number) => {
  return Math.abs(count) > 999
    ? Math.sign(count) * ((Math.abs(count) / 1000).toFixed(1) as any) + 'k'
    : Math.sign(count) * Math.abs(count);
};

const Count = ({ count, icon, title = '', className = '' }: CountProps) => {
  const displayCount = getDisplayCount(count);

  return (
    <span className={`count ${className}`}>
      {icon && <Icon name={icon} size='small' className='count__icon' />}
      {title && <span className='count__title'>{title}</span>}
      {displayCount}
    </span>
  );
};

export default memo(Count);
