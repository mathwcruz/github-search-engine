import { useCallback } from 'react';
import Image from 'next/image';
import { Form, Input, Button } from 'antd';

import { UserList } from 'components/UserList';

import styles from 'styles/pages/Home.module.scss';

export default function Home() {
  const [form] = Form.useForm();

  const handleSubmitSearchOrgs = useCallback((field) => {
    console.log({ field });
    form.validateFields();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.backgroundBanner}>
        <Image
          src='/images/logo.svg'
          alt='github-search-engine'
          className={styles.logoImg}
          width={200}
          height={200}
        />
      </div>
      <div className={styles.searchBox}>
        <h2>Explore repositórios no Github.</h2>
        <Form form={form} onFinish={handleSubmitSearchOrgs}>
          <Form.Item
            className={styles.searchOrgsItem}
            name='orgs'
            rules={[
              {
                required: true,
                message: 'Insira o nome de uma organização do Github',
              },
            ]}
          >
            <Input
              className={styles.searchOrgsInput}
              bordered={false}
              placeholder='Digite aqui'
            />
          </Form.Item>
          <Button htmlType='submit'>Pesquisar</Button>
        </Form>
      </div>
      <div className={styles.usersList}>
        <ul>
          <UserList />
          <UserList />
          <UserList />
          <UserList />
        </ul>
      </div>
    </div>
  );
}
