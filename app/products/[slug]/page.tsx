"use client";
import products from "../products.json";
import { notFound } from "next/navigation";
import NavBar from "@/app/components/NavBar";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from 'react'
import collections from './../../collections/collections.json'

interface Props {
  params: {
    slug: string;
  };
}

  const ProductPage = ({ params }: Props) => {
    const [showEditForm, setShowEditForm] = useState(false);

    const product = products.find(
      (p) =>
        p.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "") === params.slug
    );
  
    if (!product) return notFound();

  

  const [form, setForm] = useState({
    id: String(product.id),
    name: "",
    product_type: "",
    size: "",
    price: "",
    collection: "",
  });

  useEffect(() => {
    setForm({
      id: String(product.id),
      name: product.name,
      product_type: product.product_type,
      size: product.size,
      price: String(product.price),
      collection: product.collection,
    })
  }, [product])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
    }
  }
  

  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key as keyof typeof form]);
    }
    if (file) {
      formData.append("image", file);
    }

    const res = await fetch("/api/editProducts", {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      alert("Product Updated!");
      const updated = await res.json()
      const newSlug = updated.product.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")

  window.location.href = `/products/${newSlug}`
    } else {
      alert("Something went wrong.");
    }
  };

  const deleteProduct = async () => {

    const res = await fetch(`/api/deleteProducts?id=${form.id}`, {
      method: "DELETE",

    });

    if (res.ok) {
      alert("Product deleted!");
      window.location.href = "/products";
    } else {
      alert("Failed to delete product.");
    }

  }

  return (
    <>
      <NavBar></NavBar>
      <div className="breadcrumbs text-sm ps-4">
        <ul>
          <li>
            <Link href="/"> Home</Link>
          </li>
          <li>
            <Link href="/products">Products</Link>
          </li>
          <li>
            <p>{product.name}</p>
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-center mt-12">
        <div className="card bg-base-100 w-96 shadow-sm" data-theme="dark">
          <figure>
            <img src={`/${product.image}`} alt={product.name} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
            <p>{product.product_type}</p>
            <p>{product.size}</p>
            <p>£{product.price}</p>
            <p>{product.collection}</p>
            <div className="card-actions justify-end">
              <button className="btn bg-rose-500 text-stone-950" onClick={()=>(document.getElementById('deleteModal')as HTMLDialogElement)?.showModal()}>Delete</button>
              <dialog id="deleteModal" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Are you sure?</h3>
                  <p className="py-4">This action cannot be undone. Click </p>
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn bg-stone-50 text-stone-950">Cancel</button>
                    </form>
                    <button className="btn bg-rose-500 text-stone-950" onClick={(e) => {
                      e.preventDefault()
                      deleteProduct()}}>Delete</button>
                  </div>
                </div>
              </dialog>
              <button
                className="btn bg-stone-50 text-stone-950"
                onClick={() => setShowEditForm((prev) => !prev)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      {showEditForm && (
        <div className="flex items-center justify-center mt-12">
          <div className="card bg-base-100 w-96 shadow-sm" data-theme="dark">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input type="number" value={form.id} name="id" hidden></input>
                {/* name */}
                <label className="input">
                  <span className="label">Product Name</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </label>
                {/* product type */}
                <label className="input">
                  <span className="label">Product Type</span>
                  <select
                    name="product_type"
                    defaultValue={form.product_type}
                    className="select select-ghost"
                    required
                  >
                    <option disabled={true}>Product Type</option>
                    {[...new Set(products.map((p) => p.product_type))].map(
                      (type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      )
                    )}
                  </select>
                </label>
                {/* size */}
                <label className="input">
                  <span className="label">Product Weight/Size</span>
                  <input
                    type="text"
                    name="size"
                    value={form.size}
                    onChange={handleChange}
                    required
                  />
                </label>
                {/* price */}
                <label className="input">
                  <span className="label">Price</span>
                  <input
                    type="text"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </label>
                {/* collection */}
                <label className="input">
                  <span className="label">Collection</span>
                  <select
                    name="collection"
                    defaultValue={form.collection}
                    onChange={handleChange}
                    className="select select-ghost"
                    required
                  >
                    <option disabled={true}>Product collection</option>
                    {collections.map((product) => (
                      <option key={product.id}>{product.name}</option>
                    ))}
                  </select>
                  {/* image */}
                </label>
                <div className="flex flex-col items-center mt-4 border border-zinc-300 rounded-md">
                  <p className="p-3 zinc-300">Product image</p>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="file-input file-input-ghost ms-2 mb-2 text-stone-50"
                    onChange={handleFileChange}
                    data-theme="light"
                  />
                </div>
                              {/* save */}
                <div className="card-actions justify-end">
                  <button className="btn bg-stone-50 text-stone-950 mt-4">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
