import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Form, Input, Button, Spin, Empty } from 'antd';

import { useFetch } from 'services/hooks/fetch';

import { MemberList } from 'components/MemberList';

import styles from 'styles/pages/Home.module.scss';

export default function Home() {
  const [form] = Form.useForm();
  const {
    data: members,
    get: getMembers,
    loading: loadingMembers,
  } = useFetch();

  const handleSubmitSearchOrgs = useCallback(async (field) => {
    form.validateFields();

    const org = field?.orgs.trim();

    await getMembers({
      url: `https://api.github.com/orgs/${org}/members`,
    });

    form.resetFields();
  }, []);

  useEffect(() => {
    console.log({ members });
  }, [members]);

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
                message: 'Insira o nome de uma organização no Github',
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
      <div className={styles.membersList}>
        <ul className={loadingMembers ? `${styles.isLoading}` : ''}>
          {loadingMembers ? (
            <Spin size='large' />
          ) : (
            <>
              {!members ? (
                <div className={styles.hasntMembers}>
                  <Empty description='Nenhum dado foi encontrado' />
                </div>
              ) : (
                <>
                  {members?.map((member) => (
                    <MemberList key={member?.id} member={member} />
                  ))}
                </>
              )}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
