// dllmain.cpp : 定义 DLL 应用程序的入口点。
#include "stdafx.h"
#include "MpegPyd.h"

/*****************************************************************************
* 模块的初始化函数. import 时自动调用。
*****************************************************************************/
PyMODINIT_FUNC           // == __decslpec(dllexport) PyObject*, 定义导出函数.
PyInit_mpegCoder(void) {       //模块外部名称为--CppClass
    PyObject* pReturn = 0;
    C_MPDC_ClassInfo.tp_new = PyType_GenericNew; //此类的new内置函数—建立对象.
    C_MPEC_ClassInfo.tp_new = PyType_GenericNew;
    C_MPCT_ClassInfo.tp_new = PyType_GenericNew;

                                                  /// 完成对象类型的初始化—包括添加其继承特性等等。
                                                  /// 如果成功，则返回0，否则返回-1并抛出异常.
    if (PyType_Ready(&C_MPDC_ClassInfo) < 0)
        return nullptr;
    if (PyType_Ready(&C_MPEC_ClassInfo) < 0)
        return nullptr;
    if (PyType_Ready(&C_MPCT_ClassInfo) < 0)
        return nullptr;

    pReturn = PyModule_Create(&ModuleInfo); //根据模块信息创建模块，注意该步骤没有注册模块到计数器，所以需要调用Py_INCREF
    if (pReturn == 0)
        return nullptr;

    Py_INCREF(&ModuleInfo);
    PyModule_AddFunctions(pReturn, C_MPC_MethodMembers); //将这个函数加入到模块的Dictionary中.
    PyModule_AddObject(pReturn, "MpegDecoder", (PyObject*)&C_MPDC_ClassInfo); //将这个类加入到模块的Dictionary中.
    PyModule_AddObject(pReturn, "MpegEncoder", (PyObject*)&C_MPEC_ClassInfo);
    PyModule_AddObject(pReturn, "MpegClient", (PyObject*)&C_MPCT_ClassInfo);
    return pReturn;
}

/*
BOOL APIENTRY DllMain( HMODULE hModule,
                       DWORD  ul_reason_for_call,
                       LPVOID lpReserved
					 )
{
	switch (ul_reason_for_call)
	{
	case DLL_PROCESS_ATTACH:
	case DLL_THREAD_ATTACH:
	case DLL_THREAD_DETACH:
	case DLL_PROCESS_DETACH:
		break;
	}
	return TRUE;
}
*/
