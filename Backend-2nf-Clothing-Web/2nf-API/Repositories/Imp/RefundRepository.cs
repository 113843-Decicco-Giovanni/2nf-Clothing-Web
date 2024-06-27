using _2nf_API.Entities;

namespace _2nf_API.Repositories.Imp
{
    public class RefundRepository : IRefundRepository
    {
        public Task<Refund> Save(Refund refund)
        {
            throw new NotImplementedException();
        }

        public Task<Refund> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Refund> GetBySaleId(int saleId)
        {
            throw new NotImplementedException();
        }

        public Task<List<Refund>> GetByState(int state)
        {
            throw new NotImplementedException();
        }

        public Task<Refund> Update(Refund refund)
        {
            throw new NotImplementedException();
        }
    }
}
