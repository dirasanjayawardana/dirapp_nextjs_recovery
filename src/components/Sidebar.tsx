"use client"
import react from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiHome } from 'react-icons/fi'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { sidebarData, sidebarAdmin } from '../data/data'
import { useStateContext } from '@/contexts/ContextProvider'
import { BiLogOut } from 'react-icons/bi';
import { BsFacebook, BsGithub, BsInstagram } from 'react-icons/bs';

const Sidebar = () => {

	const user = useSelector((state: any) => state.user);
	const { showSidebar, setShowSidebar, showActiveSide, setShowActiveSide, currentColor } = useStateContext();
	const pathname = usePathname();
	const router = useRouter();

	const handleLogout = () => {
		// localStorage.removeItem('token');
		document.cookie = `${"token"}=; Max-Age=0; Path=/`;
		router.push('/login');
	}

	return (
		<div className={`${showSidebar ? "w-60" : "w-0 -translate-x-96 overflow-hidden"} transition-all duration-500 fixed top-0 left-0 border-l-8 border-gray-200 dark:border-slate-700 z-50`}>
			<div className='bg-white dark:bg-slate-800 h-screen shadow-xl p-2 overflow-y-auto cursor-pointer flex flex-col'>
				<div className="">
					<div className="ml-5 mr-3 mt-5 text-xl flex justify-between gap-3 items-center">
						<h3>
							<span
								style={{ color: currentColor }}
								className={`font-bold text-3xl`}>D</span>ir
							<span
								style={{ color: currentColor }}
								className={`font-bold text-3xl`}>A</span>pp
						</h3>
						<button
							onClick={() => setShowSidebar(false)}
							className="hover:bg-white dark:hover:bg-slate-800 p-2 rounded-xl"
						>
							<MdOutlineKeyboardArrowLeft />
						</button>
					</div>

					<div className="my-12 flex flex-col gap-2">
						<Link href='/dashboard'>
							<div
								className={`flex gap-3 items-center px-4 py-2 rounded-xl ${pathname === '/dashboard' ? `bg-[${currentColor}] hover:bg-[${currentColor}] text-white` : "hover:bg-gray-100 dark:hover:bg-slate-700"
									}`}
							>
								<FiHome className='text-xl' />
								<h3 className=''>Home</h3>
							</div>
						</Link>

						{sidebarData.map((items, index) => (
							<div key={index} className={`px-4 py-2 rounded-xl`}>
								<div className="flex gap-3 items-center">
									<div className="text-xl">{items.icon}</div>
									<h3 className=''>{items.header}</h3>
								</div>
								{/* <hr className='mt-2' /> */}
								<div className={`transition-all ml-3 mt-2 flex flex-col gap-2`}>
									{items.pages.map((item, index) => (
										<Link key={index} href={item.link}>

											<button
												onClick={() => setShowActiveSide(item.id_active)}
												className='w-full'>
												<div
													className={`${pathname.includes(item.link.split("#")[0]) ? `bg-[${currentColor}] hover:bg-[${currentColor}] text-white` : "hover:bg-gray-100 dark:hover:bg-slate-700"} flex gap-3 items-center px-4 py-2 hover:scale-110 transition duration-300 rounded-xl mr-1`}
												>
													<div className="">{item.icon}</div>
													<h3 className=''>{item.name}</h3>
												</div>
											</button>
										</Link>
									))}
								</div>
							</div>
						))}

						{user.role === "DIRAPP" &&
							sidebarAdmin.map((items, index) => (
								<div key={index} className={`px-4 py-2 rounded-xl`}>
									<div className="flex gap-3 items-center">
										<div className="text-xl">{items.icon}</div>
										<h3 className=''>{items.header}</h3>
									</div>
									{/* <hr className='mt-2' /> */}
									<div className={`transition-all ml-3 mt-2 flex flex-col gap-2`}>
										{items.pages.map((item, index) => (
											<Link key={index} href={item.link}>

												<button
													onClick={() => setShowActiveSide(item.id_active)}
													className='w-full'>
													<div
														className={`${pathname.includes(item.link.split("#")[0]) ? `bg-[${currentColor}] hover:bg-[${currentColor}] text-white` : "hover:bg-gray-100 dark:hover:bg-slate-700"} flex gap-3 items-center px-4 py-2 hover:scale-110 transition duration-300 rounded-xl mr-1`}
													>
														<div className="">{item.icon}</div>
														<h3 className=''>{item.name}</h3>
													</div>
												</button>
											</Link>
										))}
									</div>
								</div>
							))}

						<button
							onClick={handleLogout}
							className={`flex gap-3 items-center px-4 rounded-xl ${pathname === '/login' ? `bg-[${currentColor}] hover:bg-[${currentColor}] text-white` : "mx-1"}`}
						>
							<BiLogOut className='text-xl' />
							<h3 className=''>Logout</h3>
						</button>
						{/* <hr className='mt-2 mx-4' /> */}
					</div>
				</div>

				<div className='mb-10'>
					<h5 className='text-center text-xs'>Follow me on</h5>
					<div className="mt-3 flex items-center justify-center gap-3 w-full">
						<BsGithub size={22} />
						<BsInstagram size={22} className='text-[#d7396e]' />
						<BsFacebook size={22} className='text-[#3964c0]' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Sidebar