import { useState } from "react";
import { FaRegEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { useAddressContext } from "../../context/AddressContext";

const Addresses = () => {
  const {
    addresses,
    deleteAddress,
    updateAddress,
    addAddress,
    setDefaultAddress,
    loading,
  } = useAddressContext();

  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [processingDefaultId, setProcessingDefaultId] = useState(null);

  const initialForm = {
    country: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    isDefault: false,
  };

  const [editForm, setEditForm] = useState(initialForm);
  const [newAddress, setNewAddress] = useState(initialForm);

  const handleEditClick = (address) => {
    setEditingId(address._id);
    const { _id, ...rest } = address;
    setEditForm(rest);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async () => {
    const updatedForm = { ...editForm };
    delete updatedForm._id;
    const res = await updateAddress(editingId, updatedForm);
    if (res) setEditingId(null);
  };

  const handleDelete = async (id) => {
    await deleteAddress(id);
  };

  const handleNewChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddAddress = async () => {
    const res = await addAddress(newAddress);
    if (res) {
      setNewAddress(initialForm);
      setShowAddForm(false);
    }
  };

  const handleSetDefault = async (addressId) => {
    setProcessingDefaultId(addressId);
    await setDefaultAddress(addressId);
    setProcessingDefaultId(null);
  };

  if (loading) return <p className="text-center py-6">Loading addresses...</p>;

  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Saved Addresses</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 text-sm text-pink-600 hover:underline"
        >
          <FaPlus /> {showAddForm ? "Cancel" : "Add Address"}
        </button>
      </div>

      {showAddForm && (
        <div className="border border-pink-200 rounded-lg p-4 mb-6 shadow-sm bg-pink-50">
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(newAddress).map(([key, value], i) =>
              key !== "isDefault" ? (
                <input
                  key={i}
                  type="text"
                  name={key}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  className="border rounded px-3 py-1 text-sm"
                  value={value}
                  onChange={handleNewChange}
                />
              ) : (
                <label key={i} className="md:col-span-2 flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={value}
                    onChange={handleNewChange}
                  />
                  Set as Default Address
                </label>
              )
            )}
          </div>
          <button
            onClick={handleAddAddress}
            className="mt-4 bg-pink-600 hover:bg-pink-700 text-white text-sm px-4 py-2 rounded"
          >
            Save Address
          </button>
        </div>
      )}

      {addresses.length === 0 ? (
        <p className="text-sm text-gray-500">No addresses saved.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="border border-pink-200 rounded-lg p-4 shadow-sm"
            >
              {editingId === address._id ? (
                <>
                  {Object.entries(editForm).map(([key, value], i) =>
                    key !== "isDefault" ? (
                      <input
                        key={i}
                        type="text"
                        name={key}
                        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                        className="w-full mb-2 border rounded px-3 py-1 text-sm"
                        value={value}
                        onChange={handleEditChange}
                      />
                    ) : null // hide isDefault in edit form
                  )}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={handleUpdate}
                      className="bg-pink-600 hover:bg-pink-700 text-white text-sm px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-sm text-gray-600 hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-semibold text-pink-600 bg-pink-50 px-2 py-1 rounded-full">
                      {address.isDefault ? "Default Address" : "Address"}
                    </span>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <button
                        onClick={() => handleEditClick(address)}
                        className="hover:text-pink-600"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(address._id)}
                        className="hover:text-red-500"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p><span className="font-semibold">Phone:</span> {address.phone}</p>
                    <p><span className="font-semibold">Address:</span> {address.address}</p>
                    {address.apartment && (
                      <p><span className="font-semibold">Apartment:</span> {address.apartment}</p>
                    )}
                    <p>
                      <span className="font-semibold">City/State/Pincode:</span>{" "}
                      {address.city}, {address.state} - {address.pincode}
                    </p>
                    <p><span className="font-semibold">Country:</span> {address.country}</p>
                    {!address.isDefault && (
                      <button
                        onClick={() => handleSetDefault(address._id)}
                        className="mt-2 text-xs text-blue-600 hover:underline disabled:opacity-50"
                        disabled={processingDefaultId === address._id}
                      >
                        {processingDefaultId === address._id
                          ? "Setting..."
                          : "Set as Default"}
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Addresses;
