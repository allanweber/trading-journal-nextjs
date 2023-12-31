import { PageHeader, Subtitle, Title } from '@/components/PageHeader';
import { EntryType } from '@/model/entryType';
import { useTranslations } from 'next-intl';
import DepositForm from '../../components/DepositForm';
import DividendForm from '../../components/DividendForm';
import TaxesForm from '../../components/TaxesForm';
import TradeForm from '../../components/TradeForm';
import WithdrawalForm from '../../components/WithdrawalForm';

const EntryForm = ({ entryType }: { entryType: EntryType }) => {
  switch (entryType) {
    case EntryType.Trade:
      return <TradeForm />;
    case EntryType.Withdrawal:
      return <WithdrawalForm />;
    case EntryType.Deposit:
      return <DepositForm />;
    case EntryType.Taxes:
      return <TaxesForm />;
    case EntryType.Dividend:
      return <DividendForm />;
    default:
      throw new Error(`Invalid entry type: ${entryType}`);
  }
};

export default function Page({ params }: { params: { entryType: EntryType } }) {
  const tEntry = useTranslations('trade-types');
  const t = useTranslations('entries');
  return (
    <>
      <PageHeader>
        <div>
          <Title>{tEntry(params.entryType)}</Title>
          <Subtitle>
            {t('create', { entry: tEntry(params.entryType).toLowerCase() })}
          </Subtitle>
        </div>
      </PageHeader>
      <EntryForm entryType={params.entryType} />
    </>
  );
}
