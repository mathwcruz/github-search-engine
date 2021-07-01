import { Button, Popover } from 'antd';

export default function Home() {
  return (
    <Popover content='Hello World' title='Title'>
      <Button type='dashed'>Bora codar</Button>
    </Popover>
  );
}
