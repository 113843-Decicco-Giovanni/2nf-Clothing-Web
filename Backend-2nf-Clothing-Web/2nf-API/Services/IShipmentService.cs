using _2nf_API.Requests;
using _2nf_API.Responses;

namespace _2nf_API.Services
{
    public interface IShipmentService
    {
        Task<ShipmentResponse> GetShipmentById(int id);
        Task<ShipmentResponse> GetShipmentBySaleId(int saleId);
        Task<List<ShipmentResponse>> GetShipments(
            int? estado,
            DateTime? fechaInicio,
            DateTime? fechaFin,
            int? clientDoc);
        Task<List<ShipmentResponse>> GetShipmentsByClient(int nroDoc);
        Task<ShipmentResponse> ModifyShipment(int id, ShipmentRequest request);
        Task<ShipmentResponse> UpdateShipmentState(int shipmentId, long trackingId, string service);
        Task<ShipmentResponse> CancelShipment(int id);
    }
}
