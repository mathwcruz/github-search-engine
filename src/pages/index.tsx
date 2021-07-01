import { Button, Popover } from 'antd';

export default function Home() {
  return (
    <Popover content='Hello World' title='Title'>
      <Button className='bg-blue-400' type='dashed'>
        Bora codar
      </Button>
    </Popover>
  );
}
