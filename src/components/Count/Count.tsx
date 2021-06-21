import { memo } from 'react';

import { Icon } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';

interface CountProps {
  count: number;
  icon?: SemanticICONS;
}

const getDisplayCount = (count: number) => {
  return Math.abs(count) > 999
    ? Math.sign(count) * ((Math.abs(count) / 1000).toFixed(1) as any) + 'k'
    : Math.sign(count) * Math.abs(count);
};

const Count = ({ count, icon }: CountProps) => {
  const displayCount = getDisplayCount(count);

  return (
    <span className='count'>
      {icon && <Icon name={icon} size='small' />}
      {displayCount}
    </span>
  );
};

export default memo(Count);
